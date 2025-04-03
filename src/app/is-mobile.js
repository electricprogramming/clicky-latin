/**
 * Determines whether the user's device is mobile, first trying to use navigator.userAgentData and using navigator.userAgent as a fallback.
 * @returns {boolean}
 */
export default function isMobile() {
  if (window.overrideMobile) return true;
  if (navigator.userAgentData) {
    return navigator.userAgentData.mobile;
  }
  const mobileRegex = /(android|iphone|ipad|ipod|windows phone|blackberry|mobile|touch)/i;
  return mobileRegex.test(navigator.userAgent);
}