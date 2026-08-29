const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navegar al reporte
  const reportPath = path.join(__dirname, '../playwright-report/index.html');
  await page.goto(`file://${reportPath}`);
  
  // Esperar a que cargue el reporte
  await page.waitForLoadState('networkidle');
  
  // Capturar screenshot
  await page.screenshot({ 
    path: path.join(__dirname, '../assets/clase06-test-report.png'),
    fullPage: true 
  });
  
  console.log('✅ Screenshot guardado en assets/clase06-test-report.png');
  
  await browser.close();
})();
