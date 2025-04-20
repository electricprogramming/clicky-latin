export default async function handler(req, res) {
  fetch(`https://clickylatin-api.vercel.app/delete?gamecode=${req.query.gamecode}`, {
    headers: {
      Authorization: `Key ${process.env.VALID_DELETE_KEY}`
    }
  })
    .then(async function(response) {
      res.status(response.status).json(await response.json())
    })
    .catch(e => {
      console.error(e);
      res.status(500).json({ error: e.message });
    });
}