const topDoc = window.top.document.documentElement;
const thisDoc = document.documentElement;

Array.from(topDoc.style).forEach(v => {
  thisDoc.style.setProperty(v, topDoc.style.getPropertyValue(v));
});