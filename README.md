# 天气预报应用 (Weather Forecast App)

一个基于React开发的现代化天气预报应用，提供实时天气信息和未来5天天气预报。

## 功能特点

- 🌤️ 实时天气信息显示（温度、湿度、风速、天气状况）
- 📅 未来5天天气预报
- 🔍 支持中英文城市搜索
- 💾 搜索历史记录
- 🎨 根据天气状况动态变化的背景
- 📱 响应式设计，适配各种设备
- ⚡ 天气数据缓存，提高加载速度

## 技术栈

- React 19.2.0
- CSS3 (Flexbox & Grid)
- OpenWeatherMap API
- LocalStorage (用于搜索历史)

## 安装与运行

### 前置要求

- Node.js (推荐 v14 或更高版本)
- npm 或 yarn

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/yuanguancheng/weatherforecastapp.git
cd weatherforecastapp
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm start
```

应用将在 [http://localhost:3000](http://localhost:3000) 上运行。

## 构建与部署

### 构建生产版本

```bash
npm run build
```

这将创建一个优化的生产版本到 `build` 文件夹。

### 部署到GitHub Pages

1. 首先确保您已经配置了GitHub仓库
2. 运行以下命令：

```bash
npm run deploy
```

### 环境变量配置

如需使用自定义API密钥，创建 `.env` 文件：

```env
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

然后在 `src/utils/apiConfig.js` 中引用：

```javascript
const API_CONFIG = {
  API_KEY: process.env.REACT_APP_WEATHER_API_KEY || 'default_key'
};
```

## 项目结构

```
weatherforecastapp/
├── public/                 # 静态资源
├── src/
│   ├── components/         # React组件
│   │   └── WeatherIcon.js  # 天气图标组件
│   ├── utils/              # 工具函数
│   │   ├── apiConfig.js    # API配置
│   │   ├── weatherAPI.js   # 天气API调用
│   │   ├── weatherCache.js # 天气数据缓存
│   │   ├── weatherIcons.js # 天气图标映射
│   │   └── errorHandler.js # 错误处理
│   ├── App.js              # 主应用组件
│   ├── WeatherApp.js       # 天气应用主组件
│   ├── WeatherApp.css      # 样式文件
│   └── index.js            # 应用入口
├── package.json            # 项目配置
└── README.md               # 项目说明
```

## API使用

本项目使用 [OpenWeatherMap API](https://openweathermap.org/api) 获取天气数据。

### API端点

- 当前天气: `https://api.openweathermap.org/data/2.5/weather`
- 5天预报: `https://api.openweathermap.org/data/2.5/forecast`

### 使用说明

1. 在输入框中输入城市名称（支持中文或英文）
2. 点击"搜索"按钮或按回车键
3. 查看当前天气和未来5天预报
4. 点击预报日期可查看详细信息

## 自定义配置

如需使用自己的API密钥，请修改 `src/utils/apiConfig.js` 文件中的 `API_KEY` 值。

## 贡献

欢迎提交问题和拉取请求来改进这个项目。

## 许可证

MIT License

## 在线演示

[ https://yuanguancheng.github.io/weatherforecastapp/]( https://yuanguancheng.github.io/weatherforecastapp/)
