// src/WeatherApp.js
import React, { useState } from 'react';
import './WeatherApp.css';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 处理输入框变化 - 存储用户输入的城市名称
  const handleInputChange = (e) => {
    setCity(e.target.value);
    // 如果用户开始输入，清除之前的错误信息
    if (error) {
      setError(null);
    }
  };

  // 模拟天气API调用（后续替换为真实API）
  const fetchWeatherData = async (cityName) => {
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 模拟API响应数据
    if (cityName.toLowerCase() === 'beijing' || cityName === '北京') {
      return {
        city: '北京',
        temperature: 22,
        condition: '晴',
        humidity: 45,
        windSpeed: 12,
        icon: 'sunny'
      };
    } else if (cityName.toLowerCase() === 'shanghai' || cityName === '上海') {
      return {
        city: '上海',
        temperature: 25,
        condition: '多云',
        humidity: 65,
        windSpeed: 8,
        icon: 'cloudy'
      };
    } else {
      throw new Error('未找到该城市的天气信息，请检查城市名称是否正确');
    }
  };

  // 处理搜索 - 绑定搜索按钮 onClick 事件
  const handleSearch = async () => {
    // 验证输入
    if (!city.trim()) {
      setError('请输入城市名称');
      return;
    }

    // 清除上一次的错误提示
    setError(null);

    // 设置加载状态
    setLoading(true);

    try {
      // 调用天气API
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      // 设置错误信息
      setError(err.message);
      // 清除天气数据
      setWeatherData(null);
    } finally {
      // 结束加载状态
      setLoading(false);
    }
  };

  // 处理回车键
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="weather-app">
      <div className="weather-container">
        <h1 className="app-title">天气预报</h1>

        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="请输入城市名称（如：北京、上海）"
            value={city}
            onChange={handleInputChange}  // 绑定 onChange 事件
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <button
            className="search-button"
            onClick={handleSearch}  // 绑定 onClick 事件
            disabled={loading}
          >
            {loading ? '搜索中...' : '搜索'}
          </button>
        </div>

        {loading && (
          <div className="loading-section">
            <div className="loading-spinner"></div>
            <p>正在获取天气数据...</p>
          </div>
        )}

        {error && (
          <div className="error-section">
            <p className="error-message">{error}</p>
          </div>
        )}

        {weatherData && (
          <div className="weather-display">
            <h2>{weatherData.city}</h2>
            <div className="weather-main">
              <div className="temperature">{weatherData.temperature}°C</div>
              <div className="condition">{weatherData.condition}</div>
            </div>
            <div className="weather-details">
              <div className="detail-item">
                <span className="detail-label">湿度:</span>
                <span className="detail-value">{weatherData.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">风速:</span>
                <span className="detail-value">{weatherData.windSpeed} km/h</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
