// src/WeatherApp.js
import React, { useState } from 'react';
import { fetchCurrentWeather, fetchWeatherForecast } from './utils/weatherAPI';
import { getWeatherIcon } from './utils/weatherIcons';
import './WeatherApp.css';
import API_CONFIG from './utils/apiConfig';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 处理输入框变化
  const handleInputChange = (e) => {
    setCity(e.target.value);
    // 如果用户开始输入，清除之前的错误信息
    if (error) {
      setError(null);
    }
  };

  // 处理搜索
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
      // 并行获取当前天气和预报数据
      const [currentWeather, forecast] = await Promise.all([
        fetchCurrentWeather(city),
        fetchWeatherForecast(city)
      ]);

      setWeatherData(currentWeather);
      setForecastData(forecast);
    } catch (err) {
      // 设置错误信息
      setError(err.message);
      // 清除天气数据
      setWeatherData(null);
      setForecastData([]);
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
          {/* // 在 WeatherApp.js 中更新输入框的 placeholder */}
          <input
            type="text"
            className="search-input"
            placeholder="请输入城市名称（中文或英文，如：北京、Beijing）"
            value={city}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />

          <button
            className="search-button"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? '搜索中...' : '搜索'}
          </button>
        </div>
        {/* // 在 WeatherApp.js 的 return 语句中添加以下内容
        {(!API_CONFIG.API_KEY || API_CONFIG.API_KEY === 'your_actual_api_key_here') && (
          <div className="api-warning">
            <p>当前使用模拟数据，请设置有效的 OpenWeatherMap API 密钥以获取真实天气数据</p>
          </div>
        )} */}


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
          <>
            <div className="weather-display">
              <h2>{weatherData.city}, {weatherData.country}</h2>
              <div className="weather-main">
                <div className="temperature">{weatherData.temperature}°C</div>
                <div className="condition-info">
                  <div className="weather-icon">{getWeatherIcon(weatherData.icon).icon}</div>
                  <div className="condition">{weatherData.condition}</div>
                </div>
              </div>
              <div className="weather-details">
                <div className="detail-item">
                  <span className="detail-label">湿度:</span>
                  <span className="detail-value">{weatherData.humidity}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">风速:</span>
                  <span className="detail-value">{weatherData.windSpeed} m/s</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">气压:</span>
                  <span className="detail-value">{weatherData.pressure} hPa</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">能见度:</span>
                  <span className="detail-value">{weatherData.visibility} km</span>
                </div>
              </div>
              <div className="sun-times">
                <div className="sun-time">
                  <span className="sun-label">日出</span>
                  <span className="sun-value">{weatherData.sunrise}</span>
                </div>
                <div className="sun-time">
                  <span className="sun-label">日落</span>
                  <span className="sun-value">{weatherData.sunset}</span>
                </div>
              </div>
            </div>

            {forecastData.length > 0 && (
              <div className="forecast-section">
                <h3>未来5天预报</h3>
                <div className="forecast-container">
                  {forecastData.map((day, index) => (
                    <div key={index} className="forecast-day">
                      <div className="forecast-date">{day.dayName}</div>
                      <div className="forecast-icon">{getWeatherIcon(day.icon).icon}</div>
                      <div className="forecast-condition">{day.condition}</div>
                      <div className="forecast-temps">
                        <span className="temp-max">{day.maxTemp}°</span>
                        <span className="temp-min">{day.minTemp}°</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
