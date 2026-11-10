import {defineConfig} from '@playwright/test';
import {URL} from './scripts/local-config.mjs';
export default defineConfig({
  testDir:'./e2e',timeout:30000,workers:1,reporter:'list',
  use:{baseURL:URL,viewport:{width:1440,height:1000},launchOptions:{executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'},screenshot:'only-on-failure'},
  webServer:{command:'npm run build && npm run preview',url:URL,reuseExistingServer:!process.env.CI,timeout:15000}
});
