import {test,expect} from '@playwright/test';

test('upgrading plots show scaffolding and a live timer even when another plot is selected',async({page})=>{
  await page.clock.install();await page.goto('/');
  await page.getByRole('button',{name:'Nội thành',exact:true}).click();
  await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
  const grain=page.locator('[data-plot="R04"]');
  await grain.click();await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();
  await page.locator('[data-plot="R01"]').click();
  await expect(grain).toHaveAttribute('aria-pressed','false');
  await expect(grain.locator('.construction-frame')).toBeVisible();
  const marker=grain.locator('.site-work-marker');await expect(marker).toBeVisible();
  await expect(marker.locator('time')).toHaveText('02:00');await expect(marker).toContainText('TẠM DỪNG');
  await page.clock.runFor(5000);await expect(marker.locator('time')).toHaveText('02:00');
  await page.getByRole('button',{name:'Tiếp tục',exact:true}).click();await page.clock.runFor(3100);
  await expect(marker.locator('time')).toHaveText('01:57');await expect(marker).toContainText('ĐANG NÂNG');
  const progress=await marker.evaluate(el=>Number.parseFloat(el.style.getPropertyValue('--site-work-progress')));
  expect(progress).toBeGreaterThan(0);
  await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();await page.reload();
  await page.getByRole('button',{name:'Nội thành',exact:true}).click();
  await expect(marker.locator('time')).toHaveText('01:57');
  await page.getByRole('button',{name:'Tốc độ 8 lần',exact:true}).click();
  await page.getByRole('button',{name:'Tiếp tục',exact:true}).click();await page.clock.runFor(15000);
  await expect(marker).toHaveCount(0);await expect(grain.locator('.construction-frame')).toHaveCount(0);
  await expect(grain).not.toHaveClass(/\bbusy\b/);await expect(grain).toHaveAttribute('aria-label',/cấp 2/);
});

test('construction overlays stay visible and allow selecting their plots at compact size',async({page})=>{
  await page.setViewportSize({width:1024,height:768});await page.goto('/');
  await page.getByRole('button',{name:'Nội thành',exact:true}).click();
  await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
  for(const id of ['R04','R08','R12','R16']){
    const plot=page.locator(`[data-plot="${id}"]`);await plot.click();
    await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();
  }
  for(const id of ['R04','R08','R12','R16']){
    const plot=page.locator(`[data-plot="${id}"]`),timer=plot.locator('.site-work-marker');
    await expect(timer).toBeVisible();
    await timer.click();await expect(plot).toHaveAttribute('aria-pressed','true');
    await expect(page.getByTestId('plot-detail')).toContainText(`Ô ${Number(id.slice(1))}`);
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
