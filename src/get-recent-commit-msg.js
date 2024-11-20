export default async function getLastCommitMessage() {
  return new Promise((resolve, reject) => {
    fetch('https://api.github.com/repos/electricprogramming/clicky-latin/commits')
      .then(response => response.json())
      .then(data => data[0].commit.message)
      .then(commitMsg => resolve(commitMsg))
      .catch(error => {
        reject(error);
      });
  });
};