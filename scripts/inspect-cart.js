const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.demoblaze.com', { waitUntil: 'domcontentloaded' });
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  page.once('dialog', async dialog => { console.log('dialog', dialog.message()); await dialog.accept(); });
  await page.getByRole('link', { name: 'Add to cart' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  await page.waitForURL(/cart\.html/);
  await page.waitForTimeout(5000);
  const htmlBody = await page.locator('body').innerHTML();
  console.log('body html length', htmlBody.length);
  console.log('body html snippet', htmlBody.slice(0, 1000));
  const tbody = await page.$('#tbodyid');
  console.log('tbody exists', !!tbody);
  if (tbody) {
    const html = await page.locator('#tbodyid').innerHTML();
    console.log('tbody html', html.trim());
  }
  const rows = await page.locator('#tbodyid tr').allTextContents();
  console.log('rows', JSON.stringify(rows));
  const productCount = await page.locator('#tbodyid tr', { hasText: 'Samsung galaxy s6' }).count();
  console.log('product row count', productCount);
  const cellCount = await page.locator('#tbodyid td').allTextContents();
  console.log('cells', JSON.stringify(cellCount));
  const deleteCount = await page.locator('#tbodyid tr a', { hasText: 'Delete' }).count();
  console.log('delete count', deleteCount);
  await browser.close();
})();
