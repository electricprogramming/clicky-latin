export default function handler(req, res) {
  const VERCEL_API_TOKEN = process.env.VERCEL_API_KEY;
  const PROJECT_NAME = 'clickylatin';
  const TEAM_ID = 'team_UdiGAc5Yh2R4JswpV4P7hlsa';
  fetch(`https://api.vercel.com/v6/now/deployments?teamId=${TEAM_ID}&projectId=${PROJECT_NAME}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${VERCEL_API_TOKEN}`,
    },
  })
    .then(response => response.json())
    .then(data => data.deployments)
    .then(deployments => deployments[0])
    .then(deployment => deployment.meta.githubCommitMessage)
    .then(msg => res.send(msg))
    .catch(error => res.status(500).json({error}));
}
