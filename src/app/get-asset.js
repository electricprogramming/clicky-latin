export default function getAsset(fileName) {
  return new Promise((resolve, reject) => {
  fetch(`/src/assets/${fileName}`)
    .then(res => {
      const text = res.text();
      if (text.includes('\uFFFD')) {
        return res.blob();
      } else {
        return text;
      }
    })
    .then()
  });
}