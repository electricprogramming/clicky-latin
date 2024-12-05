const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

export default async function handler(req, res) {
  let browser = null;
  try {
    console.log('Launching Puppeteer...');
    // Launch Puppeteer using the executablePath from chrome-aws-lambda
    browser = await puppeteer.launch({
      executablePath: await chromium.executablePath, // Path to Chromium binary
      args: chromium.args, // Arguments needed to run Chromium in serverless
      headless: chromium.headless, // Ensure headless mode
      defaultViewport: chromium.defaultViewport, // Set default viewport size
    });

    const page = await browser.newPage();
    await page.setContent('<html><body><h1>Freezeframe Screenshot</h1></body></html>'); // HTML content
    console.log('Taking screenshot...');
    const screenshot = await page.screenshot(); // Capture screenshot

    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(screenshot); // Send the screenshot in response

  } catch (error) {
    console.error('Error during Puppeteer operation:', error);
    res.status(500).send('Failed to generate screenshot');
  } finally {
    if (browser) {
      console.log('Closing browser...');
      await browser.close(); // Close the browser to free up resources
    }
  }
}