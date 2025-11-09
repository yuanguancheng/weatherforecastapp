// src/utils/weatherCache.js

// 缓存过期时间（毫秒）- 10分钟
const CACHE_EXPIRY_TIME = 10 * 60 * 1000;

// 内存缓存对象
const memoryCache = {};

// 从本地存储获取缓存数据
const getStorageCache = (key) => {
  try {
    const cachedData = localStorage.getItem(`weather_${key}`);
    if (!cachedData) return null;

    const { data, timestamp } = JSON.parse(cachedData);
    const now = Date.now();

    // 检查是否过期
    if (now - timestamp > CACHE_EXPIRY_TIME) {
      localStorage.removeItem(`weather_${key}`);
      return null;
    }

    return data;
  } catch (error) {
    console.error('获取缓存数据失败:', error);
    return null;
  }
};

// 将数据保存到本地存储
const setStorageCache = (key, data) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(`weather_${key}`, JSON.stringify(cacheData));
  } catch (error) {
    console.error('保存缓存数据失败:', error);
  }
};

// 获取缓存数据
export const getCachedWeatherData = (city) => {
  // 先检查内存缓存
  if (memoryCache[city]) {
    const { data, timestamp } = memoryCache[city];
    const now = Date.now();

    // 检查是否过期
    if (now - timestamp <= CACHE_EXPIRY_TIME) {
      return data;
    }

    // 过期则删除内存缓存
    delete memoryCache[city];
  }

  // 检查本地存储缓存
  const storageData = getStorageCache(city);
  if (storageData) {
    // 更新内存缓存
    memoryCache[city] = {
      data: storageData,
      timestamp: Date.now()
    };
    return storageData;
  }

  return null;
};

// 设置缓存数据
export const setCachedWeatherData = (city, currentWeather, forecast) => {
  const data = {
    currentWeather,
    forecast,
    timestamp: Date.now()
  };

  // 更新内存缓存
  memoryCache[city] = data;

  // 更新本地存储缓存
  setStorageCache(city, data);
};

// 清除所有缓存
export const clearAllCache = () => {
  // 清除内存缓存
  Object.keys(memoryCache).forEach(key => {
    delete memoryCache[key];
  });

  // 清除本地存储缓存
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('weather_')) {
      localStorage.removeItem(key);
    }
  });
};
