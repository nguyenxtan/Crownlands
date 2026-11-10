import {test,expect} from '@playwright/test';

const openCity=async page=>{
  await page.goto('/');await page.getByRole('button',{name:'Nội thành',exact:true}).click();
  await expect(page.getByRole('button',{name:'Về giữa thành',exact:true})).toBeVisible();
};
const zoom=page=>page.getByTestId('city-zoom');

test('wheel zoom keeps the city point under the cursor and home restores the full scene',async({page})=>{
  await openCity(page);const board=page.locator('#city-board'),before=await board.boundingBox();
  const x=before.x+before.width*.6,y=before.y+before.height*.5;
  await page.mouse.move(x,y);await page.mouse.wheel(0,-500);
  await expect(zoom(page)).not.toHaveText('100%');const after=await board.boundingBox();
  expect(after.width).toBeGreaterThan(before.width*1.5);
  expect(Math.abs(after.x+after.width*.6-x)).toBeLessThan(2);
  expect(Math.abs(after.y+after.height*.5-y)).toBeLessThan(2);
  await page.getByRole('button',{name:'Về giữa thành',exact:true}).click();await expect(zoom(page)).toHaveText('100%');
  const reset=await board.boundingBox();expect(Math.abs(reset.x-before.x)).toBeLessThan(1);expect(Math.abs(reset.y-before.y)).toBeLessThan(1);
});

test('dragging from a building pans without selecting it and the next click still selects',async({page})=>{
  await openCity(page);const grain=page.locator('[data-plot="R04"]'),hall=page.locator('[data-slot="S01"]');
  await grain.click();
  await page.getByRole('button',{name:'Phóng to nội thành',exact:true}).click();
  await page.getByRole('button',{name:'Phóng to nội thành',exact:true}).click();
  const before=await page.locator('#city-board').boundingBox(),target=await hall.boundingBox();
  const x=target.x+target.width*.5,y=target.y+target.height*.5;
  await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+85,y-45,{steps:8});await page.mouse.up();
  const after=await page.locator('#city-board').boundingBox();
  expect(Math.abs(after.x-before.x)).toBeGreaterThan(40);
  await expect(grain).toHaveAttribute('aria-pressed','true');await expect(hall).toHaveAttribute('aria-pressed','false');
  await hall.click();await expect(hall).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('#detail')).toContainText('Phủ thành');
});

test('zoom limits, keyboard panning, navigation and resize leave a reachable home view',async({page})=>{
  await openCity(page);const stage=page.locator('#city-stage'),board=page.locator('#city-board');
  await stage.focus();await page.keyboard.press('+');await expect(zoom(page)).not.toHaveText('100%');
  const before=await board.boundingBox();await page.keyboard.press('ArrowRight');
  expect((await board.boundingBox()).x).toBeLessThan(before.x);
  const area=await stage.boundingBox();await page.mouse.move(area.x+area.width/2,area.y+area.height/2);await page.mouse.wheel(0,-100000);
  await expect(zoom(page)).toHaveText('300%');await expect(page.getByRole('button',{name:'Phóng to nội thành',exact:true})).toBeDisabled();
  await page.getByRole('button',{name:'Thế giới',exact:true}).click();await page.getByRole('button',{name:'Nội thành',exact:true}).click();
  await expect(zoom(page)).toHaveText('300%');await page.setViewportSize({width:1024,height:768});
  await stage.focus();await page.keyboard.press('Home');await expect(zoom(page)).toHaveText('100%');
  await expect(page.getByRole('button',{name:'Thu nhỏ nội thành',exact:true})).toBeDisabled();
  await page.locator('[data-plot="R04"]').click();await expect(page.getByTestId('plot-detail')).toContainText('Ruộng lương');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('releasing outside the city before capture starts never turns later hover into dragging',async({page})=>{
  await openCity(page);
  await page.getByRole('button',{name:'Phóng to nội thành',exact:true}).click();
  await page.getByRole('button',{name:'Phóng to nội thành',exact:true}).click();
  const stage=page.locator('#city-stage'),area=await stage.boundingBox(),board=page.locator('#city-board');
  await page.mouse.move(area.x+area.width-2,area.y+area.height*.5);await page.mouse.down();
  await page.mouse.move(area.x+area.width+30,area.y+area.height*.5);await page.mouse.up();
  const released=await board.boundingBox();
  await page.mouse.move(area.x+area.width-100,area.y+area.height*.5+50);
  const hovered=await board.boundingBox();
  expect(Math.abs(hovered.x-released.x)).toBeLessThan(1);expect(Math.abs(hovered.y-released.y)).toBeLessThan(1);
  await expect(stage).not.toHaveClass(/city-camera-dragging/);
  await page.getByRole('button',{name:'Về giữa thành',exact:true}).click();
  await page.locator('[data-plot="R04"]').click();await expect(page.getByTestId('plot-detail')).toContainText('Ruộng lương');
});

test.describe('touch city camera',()=>{
  test.use({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
  test('real two-finger pinch zooms the city, one finger pans, and taps still select',async({page})=>{
    await openCity(page);const grain=page.locator('[data-plot="R04"]');await grain.tap();
    const client=await page.context().newCDPSession(page),board=page.locator('#city-board');
    const before=await board.boundingBox(),y=before.y+before.height*.5,cx=before.x+before.width*.5;
    const touch=(id,x,y)=>({id,x,y,radiusX:3,radiusY:3,force:1});
    await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[touch(1,cx-40,y),touch(2,cx+40,y)]});
    await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[touch(1,cx-65,y),touch(2,cx+65,y)]});
    await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[touch(1,cx-85,y),touch(2,cx+85,y)]});
    await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    await expect(zoom(page)).not.toHaveText('100%');expect((await board.boundingBox()).width).toBeGreaterThan(before.width*1.8);
    await expect(grain).toHaveAttribute('aria-pressed','true');
    const panBefore=await board.boundingBox();
    await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[touch(3,cx,y)]});
    await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[touch(3,cx+55,y+20)]});
    await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    expect(Math.abs((await board.boundingBox()).x-panBefore.x)).toBeGreaterThan(25);
    const hall=page.locator('[data-slot="S01"]');await hall.tap();await expect(hall).toHaveAttribute('aria-pressed','true');
    await page.getByRole('button',{name:'Về giữa thành',exact:true}).tap();await expect(zoom(page)).toHaveText('100%');
    expect(await page.evaluate(()=>visualViewport.scale)).toBeCloseTo(1);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  });
});
