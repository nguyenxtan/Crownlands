import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {createGame,recruitUnits,upgradePlot} from '../app/src/game.js';
const openHall=async page=>{await page.getByRole('button',{name:'Nội thành',exact:true}).click();await page.locator('[data-slot="S01"]').click();};

test('hall economy separates current income, cumulative paid investments and queued forecasts',async({page})=>{
  await page.clock.install();await page.goto('/');await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
  await page.getByRole('button',{name:'Nội thành',exact:true}).click();await page.locator('[data-slot="S05"]').click();
  await page.getByLabel('Số lượng huấn luyện').fill('3');await page.getByRole('button',{name:'Huấn luyện',exact:true}).click();
  await page.locator('[data-plot="R04"]').click();await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();
  await page.locator('[data-slot="S01"]').click();const hall=page.getByTestId('hall-detail');
  await expect(hall).toContainText('1.750');await expect(hall).toContainText('+348');await expect(hall).toContainText('3 quân đang tuyển');
  await hall.getByRole('button',{name:'Xem sổ kinh tế',exact:true}).click();const book=page.getByRole('dialog',{name:'Sổ kinh tế'}),grain=book.locator('[data-economy-resource="grain"]');
  await expect(grain.locator('[data-value="production"]')).toHaveText('+400');await expect(grain.locator('[data-value="upkeep"]')).toHaveText('−52');
  await expect(grain.locator('[data-value="net"]')).toHaveText('+348');await expect(grain.locator('[data-value="forecast-net"]')).toContainText('+370');
  await expect(grain.locator('[data-value="forecast-stock"]')).toHaveText('2.119,23');
  await grain.locator('summary').click();await expect(grain.locator('[data-ledger="spent"]')).toHaveText('−50');
  const before=await page.evaluate(()=>localStorage.getItem('crownlands.foundation.primary'));
  await book.getByRole('button',{name:'6 giờ',exact:true}).click();await book.getByRole('button',{name:'15 phút',exact:true}).click();
  await expect(grain.locator('[data-value="forecast-stock"]')).toHaveText('1.841,73');
  expect(await page.evaluate(()=>localStorage.getItem('crownlands.foundation.primary'))).toBe(before);
  await page.getByRole('button',{name:'Đóng sổ kinh tế',exact:true}).click();await expect(hall.getByRole('button',{name:'Xem sổ kinh tế',exact:true})).toBeFocused();
  await page.reload();await openHall(page);await hall.getByRole('button',{name:'Xem sổ kinh tế',exact:true}).click();
  await grain.locator('summary').click();await expect(grain.locator('[data-ledger="spent"]')).toHaveText('−50');
});

test('opening the economy book suspends game time and supports keyboard close and recruitment navigation',async({page})=>{
  await page.clock.install();await page.goto('/');await openHall(page);
  await page.getByRole('button',{name:'Xem sổ kinh tế',exact:true}).click();const book=page.getByRole('dialog',{name:'Sổ kinh tế'});
  const time=await page.getByTestId('game-time').textContent();await page.clock.runFor(5000);await expect(page.getByTestId('game-time')).toHaveText(time);
  await expect(book).toContainText('Đồng hồ dừng khi mở sổ');await page.keyboard.press('Escape');await expect(book).toBeHidden();
  await expect(page.getByRole('button',{name:'Xem sổ kinh tế',exact:true})).toBeFocused();
  await page.clock.runFor(1100);await expect(page.getByTestId('game-time')).not.toHaveText(time);
  await page.getByRole('button',{name:'Xem sổ kinh tế',exact:true}).click();await book.getByRole('button',{name:'Đến Doanh trại',exact:true}).click();
  await expect(book).toBeHidden();await expect(page.getByTestId('barracks-detail')).toBeVisible();await expect(page.locator('[data-slot="S05"]')).toBeFocused();
});

for(const width of [320,390])test(`economy book filters resources and stays readable offline at ${width}px`,async({page,context})=>{
  await page.setViewportSize({width,height:844});await page.goto('/');await openHall(page);
  await page.getByRole('button',{name:'Xem thông tin đang chọn',exact:true}).click();
  await page.getByRole('button',{name:'Xem sổ kinh tế',exact:true}).click();const book=page.getByRole('dialog',{name:'Sổ kinh tế'});
  await book.getByRole('button',{name:'Lương thực',exact:true}).click();await expect(book.locator('[data-economy-resource="wood"]')).toBeHidden();
  await expect(book.locator('[data-economy-resource="grain"]')).toBeVisible();
  expect(await book.evaluate(dialog=>dialog.scrollWidth<=dialog.clientWidth)).toBe(true);
  await book.getByRole('button',{name:'6 giờ',exact:true}).focus();await page.keyboard.press('Enter');await expect(book.getByRole('button',{name:'6 giờ',exact:true})).toHaveAttribute('aria-pressed','true');
  await book.evaluate(dialog=>dialog.scrollTop=dialog.scrollHeight);
  const close=page.getByRole('button',{name:'Đóng sổ kinh tế',exact:true});
  expect(await close.evaluate(button=>{const box=button.getBoundingClientRect();return button.contains(document.elementFromPoint(box.x+box.width/2,box.y+box.height/2));})).toBe(true);
  await close.click();
  await page.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(resolve=>navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true}));});
  await context.setOffline(true);await page.reload();await openHall(page);await page.getByRole('button',{name:'Xem sổ kinh tế',exact:true}).click();await expect(book).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('importing another paid state at the same game time refreshes the hall ledger and forecast',async({page})=>{
  await page.clock.install();await page.goto('/');await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();await openHall(page);
  await page.getByRole('button',{name:'Xem sổ kinh tế',exact:true}).click();const book=page.getByRole('dialog',{name:'Sổ kinh tế'}),grain=book.locator('[data-economy-resource="grain"]');
  await expect(grain.locator('[data-value="forecast-stock"]')).toHaveText('2.148');await page.keyboard.press('Escape');
  const scenario=JSON.parse(readFileSync(new URL('../project-docs/prototype/scenarios/first-foundation.json',import.meta.url))),replacement=createGame(scenario);
  replacement.clock.paused=true;recruitUnits(replacement,replacement.cities[0].id,'sword-i',3);upgradePlot(replacement,replacement.cities[0].id,'R04');
  await page.getByRole('button',{name:'Quản lý bản lưu',exact:true}).click();page.once('dialog',dialog=>dialog.accept());
  await page.locator('#import-file').setInputFiles({name:'hall-state.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(replacement))});
  await expect(page.locator('#save-dialog')).toBeHidden();await expect(page.getByTestId('game-time')).toHaveText('Ngày 1 · 00:00:00');
  await page.getByRole('button',{name:'Xem sổ kinh tế',exact:true}).click();await expect(grain.locator('[data-value="forecast-stock"]')).toHaveText('2.119,23');
  await grain.locator('summary').click();await expect(grain.locator('[data-ledger="spent"]')).toHaveText('−50');
});

for(const width of [390,1440])test(`economy work action reveals and focuses the current jobs at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:844});await page.goto('/');await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
  await page.getByRole('button',{name:'Nội thành',exact:true}).click();await page.locator('[data-slot="S05"]').click();await page.getByLabel('Số lượng huấn luyện').fill('3');await page.getByRole('button',{name:'Huấn luyện',exact:true}).click();
  await page.locator('[data-slot="S01"]').click();await page.getByRole('button',{name:'Xem sổ kinh tế',exact:true}).click();
  await page.getByRole('dialog',{name:'Sổ kinh tế'}).getByRole('button',{name:'Xem công việc',exact:true}).click();
  const work=page.getByRole('region',{name:'Công việc trong thành'});await expect(work.getByRole('button').first()).toBeFocused();
  const region=await work.boundingBox(),top=await page.locator(width<700?'.sidebar':'.topbar').boundingBox(),footer=await page.locator('.timebar').boundingBox();
  expect(region.y).toBeGreaterThanOrEqual(top.y+top.height);expect(region.y+region.height).toBeLessThanOrEqual(footer.y);
});
