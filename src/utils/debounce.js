// src/utils/debounce.js

export const debounce = (func, delay) => {
  let timeoutId;

  return function (...args) {
    // 清除之前的定时器
    clearTimeout(timeoutId);

    // 设置新的定时器
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
