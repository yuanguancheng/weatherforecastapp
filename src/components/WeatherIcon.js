// src/components/WeatherIcon.js
import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';

const WeatherIcon = ({ iconCode, size = 'medium', useSvg = true, className = '' }) => {
  const weatherIcon = getWeatherIcon(iconCode);

  // 根据尺寸设置样式
  const sizeMap = {
    small: { width: '24px', height: '24px' },
    medium: { width: '48px', height: '48px' },
    large: { width: '64px', height: '64px' },
    xlarge: { width: '96px', height: '96px' }
  };

  const iconSize = sizeMap[size] || sizeMap.medium;

  if (useSvg && weatherIcon.svg) {
    return (
      <div
        className={`weather-icon-svg ${className}`}
        dangerouslySetInnerHTML={{ __html: weatherIcon.svg }}
        style={iconSize}
      />
    );
  }

  return (
    <div
      className={`weather-icon-emoji ${className}`}
      style={{
        fontSize: iconSize.width,
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {weatherIcon.icon}
    </div>
  );
};

export default WeatherIcon;
