import puppetteer from 'puppeteer';

jest.setTimeout(30000);
describe('tooltip', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    browser = await puppetteer.launch({
      // headless: false,
      // slowMo: 1000,
      // devtools: true,
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });

  test('Открытие тултипа', async () => {
    await page.goto(baseUrl);
    const button = await page.$('.btn-danger');
    button.click();
    await page.waitForSelector('.popover-header');
    const popoverTitle = await page.$eval('.popover-header', (e) => e.textContent);
    expect(popoverTitle).toBe('Popover title');
  });

  test('Закрытие тултипа', async () => {
    const button = await page.$('.btn-danger');
    await button.click();
    await page.waitForSelector('#popover');
    const popover = await page.$eval('#popover', (e) => e.classList.contains('hidden'));
    expect(popover).toBe(true);
  });
});
