const puppeteer = require('puppeteer');
module.exports = (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('URL is required');
  }
  puppeteer.launch()
    .then(browser => browser.newPage())
    .then(page => page.goto(url, { waitUntil: 'domcontentloaded' }))
    .then(page => page.$('iframe'))
    .then(iframe => iframe.contentFrame())
    .then(frame => frame.screenshot())
    .then(screenshotBuffer => {
      res.setHeader('Content-Type', 'image/png');
      res.status(200).send(screenshotBuffer);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send(`Error capturing screenshot: ${error.message}`);
    });
};