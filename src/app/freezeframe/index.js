import puppeteer from 'puppeteer-core';
import chromium from 'chrome-aws-lambda';

export default async function handler(req, res) {
  // Launch Puppeteer with Chromium in AWS Lambda environment
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: true
  });

  const page = await browser.newPage();

  // Create an artificial HTML document with CSS and JS
  const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f0f0f0;
        }
        .container {
          text-align: center;
          background: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
        }
        .dynamic {
          color: #007BFF;
        }
      </style>
      <script>
        document.addEventListener('DOMContentLoaded', function() {
          const dynamicText = document.querySelector('.dynamic');
          dynamicText.textContent = 'Hello, Vercel Screenshot!';
        });
      </script>
    </head>
    <body>
      <div class="container">
        <h1>My Dynamic Document</h1>
        <p class="dynamic">Loading...</p>
      </div>
    </body>
    </html>
  `;

  // Set the page content
  await page.setContent(content);

  // Wait for the page to load and the JS to run
  await page.waitForSelector('.dynamic');

  // Capture a screenshot of the page
  const screenshotBuffer = await page.screenshot();

  // Close the browser instance
  await browser.close();

  // Set the response headers and return the screenshot as an image
  res.setHeader('Content-Type', 'image/png');
  res.status(200).send(screenshotBuffer);
}