import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';

const openCity=async page=>{
  await page.goto('/');
  await page.getByRole('button',{name:'Nội thành',exact:true}).click();
};

test('city work lists simultaneous upgrades, preserves focus and selects their plots',async({page})=>{
  await page.clock.install();await openCity(page);
  await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
  for(const id of ['R04','R01']){
    await page.locator(`[data-plot="${id}"]`).click();
    await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();
  }
  const work=page.getByRole('region',{name:'Công việc trong thành'});
  await expect(work).toBeVisible();await expect(work.getByRole('button')).toHaveCount(2);
  await expect(work).toContainText('Tạm dừng');
  await expect(work).toContainText('Ruộng lương');await expect(work).toContainText('Rừng khai thác');
  const grain=work.getByRole('button',{name:'Xem Ruộng lương ô 4 đang nâng cấp',exact:true});
  await grain.click();await expect(page.getByTestId('plot-detail')).toContainText('Ô 4');
  await page.getByRole('button',{name:'Tiếp tục',exact:true}).click();await grain.focus();
  await page.clock.runFor(2100);
  await expect(grain).toBeFocused();await expect(grain).toContainText('01:58');
  await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
  const before=await grain.textContent();await page.clock.runFor(5000);
  await expect(grain).toHaveText(before);
});

test('city work returns after reload and clears completed upgrades without changing the world view',async({page})=>{
  await page.clock.install();await openCity(page);
  await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
  await page.locator('[data-plot="R04"]').click();
  await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();
  const work=page.getByRole('region',{name:'Công việc trong thành'});
  await page.reload();await page.getByRole('button',{name:'Nội thành',exact:true}).click();
  await expect(work).toBeVisible();await expect(work.getByRole('button')).toHaveCount(1);
  await page.getByRole('button',{name:'Thế giới',exact:true}).click();await expect(work).toBeHidden();
  await page.getByRole('button',{name:'Nội thành',exact:true}).click();await expect(work).toBeVisible();
  await page.getByRole('button',{name:'Tốc độ 8 lần',exact:true}).click();
  await page.getByRole('button',{name:'Tiếp tục',exact:true}).click();
  await page.clock.runFor(16000);await expect(work).toBeHidden();
  await page.locator('[data-plot="R04"]').click();await expect(page.getByTestId('plot-detail')).toContainText('CẤP 2');
});

test('importing another world updates work names and click targets even when job numbers repeat',async({page})=>{
  page.on('dialog',dialog=>dialog.accept());await openCity(page);
  await page.getByRole('button',{name:'Tạm dừng',exact:true}).click();
  const exportGame=async()=>{
    await page.getByRole('button',{name:'Quản lý bản lưu',exact:true}).click();
    const pending=page.waitForEvent('download');await page.getByRole('button',{name:'↓ Xuất bản lưu',exact:true}).click();
    const downloaded=await pending,bytes=await readFile(await downloaded.path());
    await page.getByRole('button',{name:'Đóng bản lưu',exact:true}).click();return bytes;
  };
  const importGame=async buffer=>{
    await page.getByRole('button',{name:'Quản lý bản lưu',exact:true}).click();
    await page.locator('#import-file').setInputFiles({name:'world.json',mimeType:'application/json',buffer});
    await expect(page.locator('#save-dialog')).not.toBeVisible();
  };
  const fresh=await exportGame();
  await page.locator('[data-plot="R04"]').click();await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();
  const grainWorld=await exportGame();await importGame(fresh);
  await page.locator('[data-plot="R01"]').click();await page.getByRole('button',{name:'Nâng lên cấp 2',exact:true}).click();
  await importGame(grainWorld);
  const work=page.getByRole('region',{name:'Công việc trong thành'}),row=work.getByRole('button',{name:'Xem Ruộng lương ô 4 đang nâng cấp',exact:true});
  await expect(work.getByRole('button')).toHaveCount(1);await expect(row).toBeVisible();
  await expect(row.locator('img')).toHaveAttribute('src','./assets/grain.svg');
  await row.click();await expect(page.getByTestId('plot-detail')).toContainText('Ô 4');
});
