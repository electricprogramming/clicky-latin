const webshot = require('webshot');
const path = require('path');

module.exports = async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Please provide a URL parameter' });
  }
  const validUrlPattern = /^(https?:\/\/[^\s]+)$/;
  if (!validUrlPattern.test(url)) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }
  try {
    const screenshotPath = path.join('/tmp', 'screenshot.png');
    webshot(url, screenshotPath, function (err) {
      if (err) {
        return res.status(500).json({ error: 'Error capturing the screenshot' });
      }
      res.setHeader('Content-Type', 'image/png');
      res.sendFile(screenshotPath);
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error processing the request' });
  }
};