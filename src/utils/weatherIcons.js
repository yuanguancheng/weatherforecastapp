// src/utils/weatherIcons.js
// 天气图标映射
export const weatherIconMap = {
  // 清晰天气
  '01d': { name: '晴天', icon: '☀️' },
  '01n': { name: '晴夜', icon: '🌙' },

  // 少云
  '02d': { name: '少云', icon: '⛅' },
  '02n': { name: '少云', icon: '☁️' },

  // 多云
  '03d': { name: '多云', icon: '☁️' },
  '03n': { name: '多云', icon: '☁️' },

  // 阴天
  '04d': { name: '阴天', icon: '☁️' },
  '04n': { name: '阴天', icon: '☁️' },

  // 雨天
  '09d': { name: '阵雨', icon: '🌦️' },
  '09n': { name: '阵雨', icon: '🌧️' },
  '10d': { name: '小雨', icon: '🌦️' },
  '10n': { name: '小雨', icon: '🌧️' },

  // 雷雨
  '11d': { name: '雷雨', icon: '⛈️' },
  '11n': { name: '雷雨', icon: '⛈️' },

  // 雪天
  '13d': { name: '雪', icon: '🌨️' },
  '13n': { name: '雪', icon: '🌨️' },

  // 雾
  '50d': { name: '雾', icon: '🌫️' },
  '50n': { name: '雾', icon: '🌫️' }
};

/**
 * 获取天气图标和名称
 * @param {string} iconCode - API返回的图标代码
 * @returns {Object} 包含图标和名称的对象
 */
export const getWeatherIcon = (iconCode) => {
  return weatherIconMap[iconCode] || { name: '未知', icon: '❓' };
};
