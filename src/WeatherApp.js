// src/WeatherApp.js
import React, { useState, useEffect } from 'react';
import { fetchCurrentWeather, fetchWeatherForecast } from './utils/weatherAPI';
import { getWeatherIcon } from './utils/weatherIcons';
import './WeatherApp.css';
import API_CONFIG from './utils/apiConfig';

function WeatherApp() {
  // 基本状态
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 新增状态
  const [searchHistory, setSearchHistory] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  // 从本地存储加载搜索历史
  useEffect(() => {
    const savedHistory = localStorage.getItem('weatherSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // 保存搜索历史到本地存储
  const saveSearchHistory = (cityName) => {
    const updatedHistory = [cityName, ...searchHistory.filter(item => item !== cityName)].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem('weatherSearchHistory', JSON.stringify(updatedHistory));
  };

  // 处理输入框变化
  const handleInputChange = (e) => {
    setCity(e.target.value);
    // 如果用户开始输入，清除之前的错误信息
    if (error) {
      setError(null);
    }
  };

  // 处理搜索
  const handleSearch = async (searchCity = city) => {
    // 验证输入
    if (!searchCity.trim()) {
      setError('请输入城市名称');
      return;
    }

    // 清除上一次的错误提示
    setError(null);

    // 设置加载状态
    setLoading(true);

    // 记录搜索开始时间
    const searchStartTime = Date.now();

    try {
      // 并行获取当前天气和预报数据
      const [currentWeather, forecast] = await Promise.all([
        fetchCurrentWeather(searchCity),
        fetchWeatherForecast(searchCity)
      ]);

      setWeatherData(currentWeather);
      setForecastData(forecast);
      setLastUpdated(new Date());

      // 保存到搜索历史
      saveSearchHistory(searchCity);

      // 计算并记录API响应时间
      const responseTime = Date.now() - searchStartTime;
      console.log(`API响应时间: ${responseTime}ms`);
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

  // 处理历史记录点击
  const handleHistoryClick = (historyCity) => {
    setCity(historyCity);
    handleSearch(historyCity);
  };

  // 处理预报日期点击
  const handleDayClick = (day) => {
    setSelectedDay(day);
    setShowDetails(true);
  };

  // 关闭详情
  const closeDetails = () => {
    setShowDetails(false);
    setSelectedDay(null);
  };

  // 格式化最后更新时间
  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 1000); // 秒数差

    if (diff < 60) return '刚刚更新';
    if (diff < 3600) return `${Math.floor(diff / 60)}分钟前更新`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}小时前更新`;
    return lastUpdated.toLocaleString();
  };

  return (
    <div className="weather-app">
      <div className="weather-container">
        <h1 className="app-title">天气预报</h1>

        <div className="search-section">
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
            onClick={() => handleSearch()}
            disabled={loading}
          >
            {loading ? '搜索中...' : '搜索'}
          </button>
        </div>

        {/* 搜索历史 */}
        {searchHistory.length > 0 && !loading && !weatherData && (
          <div className="search-history">
            <p>最近搜索：</p>
            <div className="history-items">
              {searchHistory.map((historyCity, index) => (
                <button
                  key={index}
                  className="history-item"
                  onClick={() => handleHistoryClick(historyCity)}
                >
                  {historyCity}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 加载状态 */}
        {loading && (
          <div className="loading-section">
            <div className="loading-spinner"></div>
            <p>正在查询天气...</p>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {/* 错误状态 */}
        {error && (
          <div className="error-section">
            <div className="error-icon">⚠️</div>
            <p className="error-message">{error}</p>
            <button className="retry-button" onClick={() => handleSearch()}>
              重试
            </button>
          </div>
        )}

        {/* 天气数据展示 */}
        {weatherData && (
          <>
            <div className="weather-display">
              <div className="weather-header">
                <h2>{weatherData.city}, {weatherData.country}</h2>
                {lastUpdated && (
                  <p className="last-updated">{formatLastUpdated()}</p>
                )}
              </div>

              <div className="weather-main">
                <div className="temperature-section">
                  <div className="temperature">{weatherData.temperature}°C</div>
                  <div className="feels-like">体感温度 {weatherData.feels_like || weatherData.temperature}°C</div>
                </div>
                <div className="condition-info">
                  <div className="weather-icon">{getWeatherIcon(weatherData.icon).icon}</div>
                  <div className="condition">{weatherData.condition}</div>
                </div>
              </div>

              <button
                className="details-toggle"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? '收起详情' : '查看详情'}
              </button>

              {showDetails && (
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
              )}
            </div>

            {/* 未来几天预报 */}
            {forecastData.length > 0 && (
              <div className="forecast-section">
                <h3>未来5天预报</h3>
                <div className="forecast-container">
                  {forecastData.map((day, index) => (
                    <div
                      key={index}
                      className={`forecast-day ${selectedDay === day ? 'selected' : ''}`}
                      onClick={() => handleDayClick(day)}
                    >
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

            {/* 选中日期的详情 */}
            {selectedDay && (
              <div className="day-details-modal">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3>{selectedDay.dayName} 详细预报</h3>
                    <button className="close-button" onClick={closeDetails}>×</button>
                  </div>
                  <div className="modal-body">
                    <div className="day-weather-main">
                      <div className="day-weather-icon">{getWeatherIcon(selectedDay.icon).icon}</div>
                      <div className="day-weather-condition">{selectedDay.condition}</div>
                    </div>
                    <div className="day-temps">
                      <div className="day-temp-max">最高温度: {selectedDay.maxTemp}°C</div>
                      <div className="day-temp-min">最低温度: {selectedDay.minTemp}°C</div>
                    </div>
                    <div className="day-details">
                      <div className="day-detail-item">
                        <span className="day-detail-label">湿度:</span>
                        <span className="day-detail-value">{selectedDay.humidity}%</span>
                      </div>
                      <div className="day-detail-item">
                        <span className="day-detail-label">风速:</span>
                        <span className="day-detail-value">{selectedDay.windSpeed} m/s</span>
                      </div>
                    </div>
                  </div>
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
