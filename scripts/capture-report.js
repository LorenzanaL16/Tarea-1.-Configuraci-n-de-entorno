const { chromium } = require('playwright');
const path = require('path');
const { pathToFileURL } = require('url');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  const reportPath = path.resolve(__dirname, '..', 'playwright-report', 'index.html');
  const reportUrl = pathToFileURL(reportPath).href;
  console.log('Opening report at', reportUrl);
  await page.goto(reportUrl, { waitUntil: 'networkidle' });
  // wait a bit for any JS-rendered parts
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.resolve(__dirname, '..', 'assets', 'test-report-clase02.png'), fullPage: true });
  console.log('Screenshot saved to assets/test-report-clase02.png');
  await browser.close();
})();
