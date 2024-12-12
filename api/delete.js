export default async function handler(req, res) {
  fetch('https://clickylatin-api.glitch.me', {
    method: 'DELETE',
    headers: {
      auth: process.env.CLICKYLATIN_API_KEY
    },
    body: req.query.id
  })
    .then(async function(response) {
      res.status(response.status).send(await response.text())
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error })
    });
}