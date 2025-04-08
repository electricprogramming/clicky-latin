/**
 * Fetches an asset from the Assets folder by filename and return type.
 * @param {string} fileName 
 * @param {'data:uri' | 'blob' | 'json' | 'text'} type
 * @returns 
 */
export default async function getAsset(fileName, type = 'text') {
  const res = await fetch(`/assets/${fileName}`);
  switch (type) {
    case 'blob':
      return await res.blob();
    case 'data:uri':
      const blob = await res.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = function () {
          resolve(this.result);
        }
        reader.onerror = function(e) {
          reject(e);
        }
        reader.readAsDataURL(blob);
      });
    case 'json':
      return await res.json();
    default:
      return await res.text();
  }
}