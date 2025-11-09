// src/utils/apiConfig.js
// API 配置文件
const API_CONFIG = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  API_KEY: process.env.REACT_APP_WEATHER_API_KEY || '3c4d7132e108ad9bed33e2f08eb1305b',
  CURRENT_WEATHER: '/weather',
  FORECAST: '/forecast',
  // 缓存配置
  CACHE_EXPIRY: parseInt(process.env.REACT_APP_CACHE_EXPIRY) || 10, // 分钟
  // 应用信息
  APP_NAME: process.env.REACT_APP_APP_NAME || '天气预报应用',
  VERSION: process.env.REACT_APP_VERSION || '1.0.0'
};

export default API_CONFIG;
