export default async function getLastCommitMessage() {
  return new Promise((resolve, reject) => {
    fetch('https://cors-anywhere.herokuapp.com/https://api.github.com/repos/electricprogramming/clicky-latin/commits')
      .then(res => res.json())
      .then(data => {
        resolve(data[0].commit.message);
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
  });
};