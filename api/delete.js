export default async function handler(req, res) {
  fetch('https://clickylatin-api.glitch.me', {
    method: 'DELETE',
    headers: {
      Authorization: `Key ${process.env.VALID_DELETE_KEY}`
    },
    body: req.query.id
  })
    .then(async function(response) {
      res.status(response.status).json(await response.json())
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error })
    });
}