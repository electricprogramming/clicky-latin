export default async function getAsset(fileName) {
  return new Promise((resolve, reject) => {
    fetch(`/assets/${fileName}`)
      .then(async res => {
        const text = await res.text();
        if (text.includes('\uFFFD')) {
          resolve(res.blob());
        } else {
          resolve(text);
        }
      })
      .catch(err => reject(err));
  });
}