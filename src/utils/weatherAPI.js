// src/utils/weatherAPI.js
import API_CONFIG from './apiConfig';
import { parseApiError } from './errorHandler';

// 中文城市名称到英文城市名称的映射
const cityMapping = {
  '北京': 'Beijing',
  '上海': 'Shanghai',
  '广州': 'Guangzhou',
  '深圳': 'Shenzhen',
  '天津': 'Tianjin',
  '重庆': 'Chongqing',
  '成都': 'Chengdu',
  '杭州': 'Hangzhou',
  '武汉': 'Wuhan',
  '西安': 'Xi\'an',
  '苏州': 'Suzhou',
  '南京': 'Nanjing',
  '香港': 'Hong Kong',
  '澳门': 'Macao',
  '台北': 'Taipei',
  '大连': 'Dalian',
  '青岛': 'Qingdao',
  '厦门': 'Xiamen',
  '宁波': 'Ningbo',
  '哈尔滨': 'Harbin',
  '沈阳': 'Shenyang',
  '济南': 'Jinan',
  '郑州': 'Zhengzhou',
  '长沙': 'Changsha',
  '昆明': 'Kunming',
  '兰州': 'Lanzhou',
  '南昌': 'Nanchang',
  '合肥': 'Hefei',
  '太原': 'Taiyuan',
  '石家庄': 'Shijiazhuang',
  '呼和浩特': 'Hohhot',
  '长春': 'Changchun',
  '福州': 'Fuzhou',
  '南宁': 'Nanning',
  '海口': 'Haikou',
  '银川': 'Yinchuan',
  '西宁': 'Xining',
  '乌鲁木齐': 'Urumqi',
  '拉萨': 'Lhasa'
};

/**
 * 获取英文城市名称
 * @param {string} cityName - 城市名称（可能是中文或英文）
 * @returns {string} 英文城市名称
 */
const getEnglishCityName = (cityName) => {
  // 如果是中文城市名称，返回对应的英文名称
  if (cityMapping[cityName]) {
    return cityMapping[cityName];
  }

  // 如果不是中文城市名称，直接返回原名称
  return cityName;
};

/**
 * 执行API请求并处理错误
 * @param {string} url - API请求URL
 * @param {string} cityName - 城市名称
 * @returns {Promise<Object>} API响应数据
 */
const executeApiRequest = async (url, cityName) => {
  try {
    console.log('请求URL:', url);

    // 设置请求超时
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API错误响应:', errorData);

      // 抛出带有API错误信息的错误
      throw new Error(errorData.message || `API请求失败 (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    // 如果是超时错误
    if (error.name === 'AbortError') {
      throw new Error('请求超时，请检查网络连接');
    }

    // 其他错误直接抛出
    throw error;
  }
};

/**
 * 获取当前天气数据
 * @param {string} cityName - 城市名称
 * @returns {Promise<Object>} 天气数据
 */
export const fetchCurrentWeather = async (cityName) => {
  try {
    // 获取英文城市名称
    const englishCityName = getEnglishCityName(cityName);

    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.CURRENT_WEATHER}?q=${englishCityName}&appid=${API_CONFIG.API_KEY}&units=metric&lang=zh_cn`;

    console.log('原始城市名称:', cityName);
    console.log('英文城市名称:', englishCityName);

    const data = await executeApiRequest(url, cityName);
    console.log('API响应数据:', data);

    // 提取需要的字段
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      visibility: data.visibility / 1000, // 转换为公里
      icon: data.weather[0].icon,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString()
    };
  } catch (error) {
    console.error('获取当前天气数据错误:', error);
    // 使用错误处理工具解析错误
    const parsedError = parseApiError(error, cityName);
    throw parsedError;
  }
};

/**
 * 获取未来几天预报数据
 * @param {string} cityName - 城市名称
 * @returns {Promise<Array>} 预报数据数组
 */
export const fetchWeatherForecast = async (cityName) => {
  try {
    // 获取英文城市名称
    const englishCityName = getEnglishCityName(cityName);

    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.FORECAST}?q=${englishCityName}&appid=${API_CONFIG.API_KEY}&units=metric&lang=zh_cn`;

    console.log('预报请求 - 原始城市名称:', cityName);
    console.log('预报请求 - 英文城市名称:', englishCityName);

    const data = await executeApiRequest(url, cityName);
    console.log('预报API响应数据:', data);

    // 处理预报数据，按天分组
    const dailyForecasts = {};

    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();

      if (!dailyForecasts[date]) {
        dailyForecasts[date] = {
          date: date,
          dayName: new Date(item.dt * 1000).toLocaleDateString('zh-CN', { weekday: 'long' }),
          temps: [],
          conditions: [],
          humidity: [],
          windSpeed: [],
          icons: []
        };
      }

      dailyForecasts[date].temps.push(Math.round(item.main.temp));
      dailyForecasts[date].conditions.push(item.weather[0].description);
      dailyForecasts[date].humidity.push(item.main.humidity);
      dailyForecasts[date].windSpeed.push(item.wind.speed);
      dailyForecasts[date].icons.push(item.weather[0].icon);
    });

    // 转换为数组并计算每天的最高/最低温度和主要天气状况
    const forecastArray = Object.values(dailyForecasts).map(day => {
      // 找出最常见的天气状况
      const conditionCount = {};
      day.conditions.forEach(cond => {
        conditionCount[cond] = (conditionCount[cond] || 0) + 1;
      });
      const mainCondition = Object.keys(conditionCount).reduce((a, b) =>
        conditionCount[a] > conditionCount[b] ? a : b
      );

      // 找出最常见的图标
      const iconCount = {};
      day.icons.forEach(icon => {
        iconCount[icon] = (iconCount[icon] || 0) + 1;
      });
      const mainIcon = Object.keys(iconCount).reduce((a, b) =>
        iconCount[a] > iconCount[b] ? a : b
      );

      return {
        date: day.date,
        dayName: day.dayName,
        maxTemp: Math.max(...day.temps),
        minTemp: Math.min(...day.temps),
        condition: mainCondition,
        humidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
        windSpeed: (day.windSpeed.reduce((a, b) => a + b, 0) / day.windSpeed.length).toFixed(1),
        icon: mainIcon
      };
    });

    // 返回未来5天的预报（不包括今天）
    return forecastArray.slice(1, 6);
  } catch (error) {
    console.error('获取天气预报数据错误:', error);
    // 使用错误处理工具解析错误
    const parsedError = parseApiError(error, cityName);
    throw parsedError;
  }
};

/**
 * 获取城市坐标
 * @param {string} cityName - 城市名称
 * @returns {Promise<Object>} 坐标数据
 */
export const fetchCityCoordinates = async (cityName) => {
  try {
    // 获取英文城市名称
    const englishCityName = getEnglishCityName(cityName);

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${englishCityName}&limit=1&appid=${API_CONFIG.API_KEY}`;

    console.log('坐标请求 - 原始城市名称:', cityName);
    console.log('坐标请求 - 英文城市名称:', englishCityName);

    const data = await executeApiRequest(url, cityName);
    console.log('坐标API响应数据:', data);

    if (data.length === 0) {
      throw new Error(`未找到城市"${cityName}"的坐标信息`);
    }

    return {
      lat: data[0].lat,
      lon: data[0].lon,
      name: data[0].name,
      country: data[0].country
    };
  } catch (error) {
    console.error('获取城市坐标错误:', error);
    // 使用错误处理工具解析错误
    const parsedError = parseApiError(error, cityName);
    throw parsedError;
  }
};
