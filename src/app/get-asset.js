export default async function getAsset(fileName, type = 'text') {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`/assets/${fileName}`);
    switch (type) {
      case 'blob':
        resolve(await res.blob());
        break;
      case 'data:uri':
        const reader = new FileReader();
        reader.onloadend = function() {
          resolve(this.result);
        }
        reader.readAsDataURL(blob);
        break;
      case 'json':
        resolve(await res.json());
        break;
      default:
        resolve(await res.text());
        break;
    }
  });
}