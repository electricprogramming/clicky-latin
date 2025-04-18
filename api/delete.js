export default async function handler(req, res) {
  fetch(`https://clickylatin-api.glitch.me?gamecode=${req.query.gamecode}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Key ${process.env.VALID_DELETE_KEY}`
    }
  })
    .then(async function(response) {
      res.status(response.status).json(await response.json())
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error })
    });
}