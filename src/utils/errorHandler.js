// src/utils/errorHandler.js

// 错误类型枚举
export const ErrorTypes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  CITY_NOT_FOUND: 'CITY_NOT_FOUND',
  API_KEY_INVALID: 'API_KEY_INVALID',
  API_LIMIT_EXCEEDED: 'API_LIMIT_EXCEEDED',
  INVALID_INPUT: 'INVALID_INPUT',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
};

// 错误消息映射
const errorMessages = {
  [ErrorTypes.NETWORK_ERROR]: '网络连接失败，请检查您的网络连接后重试',
  [ErrorTypes.CITY_NOT_FOUND]: '该城市不存在，请检查城市名称拼写或尝试使用英文名称',
  [ErrorTypes.API_KEY_INVALID]: 'API密钥无效，请联系开发者',
  [ErrorTypes.API_LIMIT_EXCEEDED]: 'API请求次数已达上限，请稍后再试',
  [ErrorTypes.INVALID_INPUT]: '输入无效，请输入有效的城市名称',
  [ErrorTypes.UNKNOWN_ERROR]: '发生未知错误，请稍后重试'
};

/**
 * 解析API错误并返回标准化的错误对象
 * @param {Error} error - 原始错误对象
 * @param {string} cityName - 查询的城市名称
 * @returns {Object} 标准化的错误对象
 */
export const parseApiError = (error, cityName = '') => {
  // 如果是网络错误
  if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
    return {
      type: ErrorTypes.NETWORK_ERROR,
      message: errorMessages[ErrorTypes.NETWORK_ERROR],
      originalError: error
    };
  }

  // 如果是API响应错误
  if (error.message && typeof error.message === 'string') {
    const message = error.message.toLowerCase();

    // 城市未找到
    if (message.includes('city not found') || message.includes('未找到')) {
      return {
        type: ErrorTypes.CITY_NOT_FOUND,
        message: errorMessages[ErrorTypes.CITY_NOT_FOUND],
        originalError: error
      };
    }

    // API密钥无效
    if (message.includes('invalid api key') || message.includes('401')) {
      return {
        type: ErrorTypes.API_KEY_INVALID,
        message: errorMessages[ErrorTypes.API_KEY_INVALID],
        originalError: error
      };
    }

    // API请求限制
    if (message.includes('limit') || message.includes('429')) {
      return {
        type: ErrorTypes.API_LIMIT_EXCEEDED,
        message: errorMessages[ErrorTypes.API_LIMIT_EXCEEDED],
        originalError: error
      };
    }
  }

  // 默认未知错误
  return {
    type: ErrorTypes.UNKNOWN_ERROR,
    message: errorMessages[ErrorTypes.UNKNOWN_ERROR],
    originalError: error
  };
};

/**
 * 验证城市名称输入
 * @param {string} cityName - 城市名称
 * @returns {Object} 验证结果
 */
export const validateCityInput = (cityName) => {
  if (!cityName || typeof cityName !== 'string') {
    return {
      isValid: false,
      error: {
        type: ErrorTypes.INVALID_INPUT,
        message: '请输入城市名称'
      }
    };
  }

  const trimmedCity = cityName.trim();

  if (!trimmedCity) {
    return {
      isValid: false,
      error: {
        type: ErrorTypes.INVALID_INPUT,
        message: '城市名称不能为空'
      }
    };
  }

  if (trimmedCity.length < 2) {
    return {
      isValid: false,
      error: {
        type: ErrorTypes.INVALID_INPUT,
        message: '城市名称至少需要2个字符'
      }
    };
  }

  if (trimmedCity.length > 50) {
    return {
      isValid: false,
      error: {
        type: ErrorTypes.INVALID_INPUT,
        message: '城市名称过长，请输入有效的城市名称'
      }
    };
  }

  // 检查是否包含特殊字符（允许中文、英文、空格、连字符和撇号）
  const validPattern = /^[\u4e00-\u9fa5a-zA-Z\s\-']+$/;
  if (!validPattern.test(trimmedCity)) {
    return {
      isValid: false,
      error: {
        type: ErrorTypes.INVALID_INPUT,
        message: '城市名称包含无效字符，请只使用中文、英文字母、空格、连字符或撇号'
      }
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * 获取错误类型的图标
 * @param {string} errorType - 错误类型
 * @returns {string} 错误图标
 */
export const getErrorIcon = (errorType) => {
  const iconMap = {
    [ErrorTypes.NETWORK_ERROR]: '🌐',
    [ErrorTypes.CITY_NOT_FOUND]: '🔍',
    [ErrorTypes.API_KEY_INVALID]: '🔑',
    [ErrorTypes.API_LIMIT_EXCEEDED]: '⏱️',
    [ErrorTypes.INVALID_INPUT]: '⚠️',
    [ErrorTypes.UNKNOWN_ERROR]: '❓'
  };

  return iconMap[errorType] || '❓';
};

/**
 * 获取错误类型的重试建议
 * @param {string} errorType - 错误类型
 * @returns {string} 重试建议
 */
export const getRetrySuggestion = (errorType) => {
  const suggestionMap = {
    [ErrorTypes.NETWORK_ERROR]: '检查网络连接后重试',
    [ErrorTypes.CITY_NOT_FOUND]: '尝试使用英文名称或检查拼写',
    [ErrorTypes.API_KEY_INVALID]: '联系开发者更新API密钥',
    [ErrorTypes.API_LIMIT_EXCEEDED]: '等待一段时间后重试',
    [ErrorTypes.INVALID_INPUT]: '输入有效的城市名称',
    [ErrorTypes.UNKNOWN_ERROR]: '稍后重试或联系技术支持'
  };

  return suggestionMap[errorType] || '稍后重试';
};
