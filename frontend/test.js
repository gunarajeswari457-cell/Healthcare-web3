const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Test Registration
    await page.goto('http://localhost:5173/register');
    await page.type('#name', 'Jane Doe');
    await page.type('#email', 'jane@example.com');
    await page.type('#password', 'password123');
    await page.click('button[type="submit"]');
    
    await page.waitForNavigation({ timeout: 5000 }).catch(() => console.log('No navigation after register'));
    console.log('Current URL after register:', page.url());
    
    // Test Login
    await page.goto('http://localhost:5173/login');
    await page.type('#email', 'jane@example.com');
    await page.type('#password', 'password123');
    await page.click('button[type="submit"]');
    
    await page.waitForNavigation({ timeout: 5000 }).catch(() => console.log('No navigation after login'));
    console.log('Current URL after login:', page.url());
    
    // Output any errors
    const errorText = await page.evaluate(() => {
      const el = document.querySelector('.text-red-600');
      return el ? el.innerText : null;
    });
    console.log('Error text on screen:', errorText);
    
    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();
