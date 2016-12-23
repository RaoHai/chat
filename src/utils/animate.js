
export const easeInOutCubic = (t, b, c, d) => {
  const cc = c - b;
  let _t = t / (d / 2);
  if (_t < 1) {
    return cc / 2 * _t * _t * _t + b;
  }
  return cc / 2 * ((_t -= 2) * _t * _t + 2) + b;
};

export function getRequestAnimationFrame() {
  if (typeof window === 'undefined') {
    return () => {};
  }
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame;
  }
  const prefix = ['moz', 'ms', 'webkit'].filter(key => `${key}RequestAnimationFrame` in window)[0];
  return prefix
    ? window[`${prefix}RequestAnimationFrame`]
    : callback => setTimeout(callback, 1000 / 60);
}
