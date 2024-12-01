// api/screenshot.js
const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

module.exports = async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('URL is required');
  }
  try {
    // Launch Puppeteer using the chrome-aws-lambda Chromium binary
    const browser = await puppeteer.launch({
      executablePath: await chromium.executablePath, // Use the executable path provided by chrome-aws-lambda
      args: chromium.args, // Arguments needed to run Chromium in serverless environments
      defaultViewport: chromium.defaultViewport,
      headless: true, // Headless mode
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const screenshotBuffer = await page.screenshot();
    await browser.close();
    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(screenshotBuffer);
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    res.status(500).send(`Error capturing screenshot: ${error.message}`);
  }
};