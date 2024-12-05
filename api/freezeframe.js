const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

export default async function handler(req, res) {
  let browser = null;
  try {
    // Launch Puppeteer using the executablePath from chrome-aws-lambda
    browser = await puppeteer.launch({
      executablePath: await chromium.executablePath, // Path to the compatible Chromium binary from chrome-aws-lambda
      args: chromium.args, // Arguments required for running Chromium in serverless environments
      headless: chromium.headless, // Ensure Chromium runs in headless mode
      defaultViewport: chromium.defaultViewport, // Set a default viewport
    });

    // Create a new page and set its content
    const page = await browser.newPage();
    await page.setContent('<html><body><h1>Freezeframe Screenshot</h1></body></html>'); // Example HTML content
    const screenshot = await page.screenshot(); // Take a screenshot

    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(screenshot); // Send the screenshot as a response

  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to generate screenshot');
  } finally {
    if (browser) {
      await browser.close(); // Ensure the browser is closed to free up resources
    }
  }
}