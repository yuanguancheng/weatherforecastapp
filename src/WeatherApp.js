// src/WeatherApp.js
import React, { useState } from 'react';
import './WeatherApp.css';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    // 这里后续会添加API调用逻辑
    console.log('搜索城市:', city);
  };

  return (
    <div className="weather-app">
      <div className="weather-container">
        <h1 className="app-title">天气预报</h1>

        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="请输入城市名称"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="search-button" onClick={handleSearch}>
            搜索
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
            {/* 这里后续会添加天气数据展示 */}
            <p>天气数据将在这里显示</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
