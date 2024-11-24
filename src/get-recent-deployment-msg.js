export default async function getLastDeploymentMessage() {
  return new Promise((resolve, reject) => {
    fetch(`https://clickylatin-api.glitch.me/current-deployment-msg?timestamp=${Date.now()}`)
      .then(res => res.json())
      .then(data => resolve(data.message))
      .catch(err => reject(err));
  });
};