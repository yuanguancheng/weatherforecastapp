// src/utils/weatherIcons.js
// 天气图标映射
export const weatherIconMap = {
  // 清晰天气
  '01d': {
    name: '晴天',
    icon: '☀️',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5" stroke="#FDB813" stroke-width="2" fill="#FDB813"/>
      <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" stroke="#FDB813" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  '01n': {
    name: '晴夜',
    icon: '🌙',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#F0E68C"/>
    </svg>`
  },

  // 少云
  '02d': {
    name: '少云',
    icon: '⛅',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5" stroke="#FDB813" stroke-width="2" fill="#FDB813"/>
      <path d="M20 17a5 5 0 0 0-4-4.9 7 7 0 0 0-10.6-3.2A5 5 0 0 0 2 17z" fill="#E0E0E0"/>
    </svg>`
  },
  '02n': {
    name: '少云',
    icon: '☁️',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#F0E68C"/>
      <path d="M20 17a5 5 0 0 0-4-4.9 7 7 0 0 0-10.6-3.2A5 5 0 0 0 2 17z" fill="#E0E0E0"/>
    </svg>`
  },

  // 多云
  '03d': {
    name: '多云',
    icon: '☁️',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#B0BEC5"/>
    </svg>`
  },
  '03n': {
    name: '多云',
    icon: '☁️',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#78909C"/>
    </svg>`
  },

  // 阴天
  '04d': {
    name: '阴天',
    icon: '☁️',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 19h12a4 4 0 0 0 0-8h-.13a6 6 0 0 0-11.75 0H6a4 4 0 0 0 0 8z" fill="#90A4AE"/>
    </svg>`
  },
  '04n': {
    name: '阴天',
    icon: '☁️',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 19h12a4 4 0 0 0 0-8h-.13a6 6 0 0 0-11.75 0H6a4 4 0 0 0 0 8z" fill="#607D8B"/>
    </svg>`
  },

  // 雨天
  '09d': {
    name: '阵雨',
    icon: '🌦️',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#B0BEC5"/>
      <path d="M8 19v2M12 19v2M16 19v2" stroke="#4FC3F7" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  '09n': {
    name: '阵雨',
    icon: '🌧️',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#78909C"/>
      <path d="M8 19v2M12 19v2M16 19v2" stroke="#4FC3F7" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  '10d': {
    name: '小雨',
    icon: '🌦️',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#B0BEC5"/>
      <path d="M7 18v3M11 18v3M15 18v3" stroke="#4FC3F7" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  '10n': {
    name: '小雨',
    icon: '🌧️',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#78909C"/>
      <path d="M7 18v3M11 18v3M15 18v3" stroke="#4FC3F7" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },

  // 雷雨
  '11d': {
    name: '雷雨',
    icon: '⛈️',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 16H9a5 5 0 0 1 0-10h.13A7 7 0 0 1 19 16z" fill="#9E9E9E"/>
      <path d="M13 16l-2 5h3l-2 5 5-7h-3z" fill="#FFC107"/>
    </svg>`
  },
  '11n': {
    name: '雷雨',
    icon: '⛈️',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 16H9a5 5 0 0 1 0-10h.13A7 7 0 0 1 19 16z" fill="#616161"/>
      <path d="M13 16l-2 5h3l-2 5 5-7h-3z" fill="#FFC107"/>
    </svg>`
  },

  // 雪天
  '13d': {
    name: '雪',
    icon: '🌨️',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#E0E0E0"/>
      <path d="M8 14v2M12 14v2M16 14v2M10 17v2M14 17v2" stroke="#B3E5FC" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  '13n': {
    name: '雪',
    icon: '🌨️',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#B0BEC5"/>
      <path d="M8 14v2M12 14v2M16 14v2M10 17v2M14 17v2" stroke="#B3E5FC" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },

  // 雾
  '50d': {
    name: '雾',
    icon: '🌫️',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 15h18M3 11h18M3 7h18M3 19h18" stroke="#CFD8DC" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  '50n': {
    name: '雾',
    icon: '🌫️',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 15h18M3 11h18M3 7h18M3 19h18" stroke="#90A4AE" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  }
};

/**
 * 获取天气图标和名称
 * @param {string} iconCode - API返回的图标代码
 * @returns {Object} 包含图标和名称的对象
 */
export const getWeatherIcon = (iconCode) => {
  return weatherIconMap[iconCode] || { name: '未知', icon: '❓', svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#9E9E9E" stroke-width="2"/><path d="M12 6v6l4 2" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round"/></svg>` };
};

/**
 * 获取天气背景渐变色
 * @param {string} iconCode - API返回的图标代码
 * @returns {string} CSS渐变色
 */
export const getWeatherGradient = (iconCode) => {
  const gradientMap = {
    // 晴天
    '01d': 'linear-gradient(135deg, #FFD54F, #FF9800)',
    '01n': 'linear-gradient(135deg, #263238, #455A64)',

    // 少云
    '02d': 'linear-gradient(135deg, #81D4FA, #4FC3F7)',
    '02n': 'linear-gradient(135deg, #37474F, #546E7A)',

    // 多云
    '03d': 'linear-gradient(135deg, #B0BEC5, #78909C)',
    '03n': 'linear-gradient(135deg, #455A64, #607D8B)',

    // 阴天
    '04d': 'linear-gradient(135deg, #90A4AE, #607D8B)',
    '04n': 'linear-gradient(135deg, #37474F, #546E7A)',

    // 雨天
    '09d': 'linear-gradient(135deg, #4FC3F7, #29B6F6)',
    '09n': 'linear-gradient(135deg, #263238, #37474F)',
    '10d': 'linear-gradient(135deg, #4FC3F7, #29B6F6)',
    '10n': 'linear-gradient(135deg, #263238, #37474F)',

    // 雷雨
    '11d': 'linear-gradient(135deg, #78909C, #546E7A)',
    '11n': 'linear-gradient(135deg, #263238, #37474F)',

    // 雪天
    '13d': 'linear-gradient(135deg, #E1F5FE, #B3E5FC)',
    '13n': 'linear-gradient(135deg, #455A64, #607D8B)',

    // 雾
    '50d': 'linear-gradient(135deg, #CFD8DC, #B0BEC5)',
    '50n': 'linear-gradient(135deg, #455A64, #546E7A)'
  };

  return gradientMap[iconCode] || 'linear-gradient(135deg, #74b9ff, #0984e3)';
};
