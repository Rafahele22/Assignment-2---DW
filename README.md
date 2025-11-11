# Weather Dashboard Application

A modern, responsive weather dashboard built with vanilla JavaScript that provides real-time weather data, air quality information, and detailed forecasts using the Open-Meteo API.

## 🌤️ Purpose

This application delivers comprehensive weather information for any location worldwide, featuring:
- Current weather conditions with visual weather icons
- 7-day weather forecast
- 24-hour hourly forecast
- Air quality index with detailed pollutant breakdown
- UV index, humidity, and atmospheric pressure monitoring
- City search functionality with 1M+ cities database
- Interactive data visualization
- Fully responsive design for mobile and desktop

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required - runs directly in the browser!

### Installation

1. **Clone or download** this repository:
   ```bash
   git clone https://github.com/Rafahele22/Assignment-2---DW.git
   ```

2. **Navigate** to the project folder:
   ```bash
   cd Assignment-2---DW
   ```

3. **Open** `index.html` in your web browser:
   - Double-click the `index.html` file, or
   - Right-click and select "Open with" → your browser, or
   - Use a local server (optional):
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Then visit: http://localhost:8000
     ```

4. **Start exploring!** The app will load with default coordinates (Lisbon, Portugal). Use the search bar to find weather for any city.

## 📂 Project Structure

```
Assignment-2---DW/
├── index.html              # Main HTML structure
├── CSS/
│   ├── style.css          # Main styling
│   ├── mobile.css         # Responsive design
│   └── animation.css      # UI animations
├── Scripts/
│   ├── main.js           # Core application logic (See docs/MAIN.md)
│   ├── api.js            # Weather API integration (See docs/API.md)
│   ├── airAPI.js         # Air quality API
│   ├── search.js         # City search functionality
│   ├── ui.js             # UI interactions
│   ├── svgCreator.js     # Weather icon generation
│   ├── indexes.js        # UV/Humidity/Pressure displays
│   ├── airIndexes.js     # Air quality calculations
│   └── weatherDescriptions.js  # Weather code translations
├── Data/
│   └── cities.json       # 1M+ cities database
├── docs/                 # Detailed documentation
│   ├── MAIN.md          # Main.js documentation
│   ├── API.md           # API integration guide
│   └── MODULES.md       # Other modules overview
└── README.md            # This file
```

## 📖 Documentation

For detailed technical documentation, please refer to:

- **[MAIN.md](docs/MAIN.md)** - Comprehensive guide to the main application logic, including:
  - Core functions breakdown
  - Data flow and state management
  - Event handling and user interactions
  - Integration with other modules

- **[API.md](docs/API.md)** - API integration documentation, covering:
  - Open-Meteo Weather API usage
  - Air Quality API integration
  - Data structure and parameters
  - Error handling

- **[MODULES.md](docs/MODULES.md)** - Overview of supporting modules:
  - UI components and interactions
  - City search implementation
  - Weather icon generation
  - Data visualization functions

## ✨ Features Overview

| Feature                  | Description                                                |
|:-------------------------|:-----------------------------------------------------------|
| **Current Weather**      | Real-time temperature, feels-like, wind, and precipitation |
| **Weekly Forecast**      | 7-day forecast with high/low temperatures                  |
| **Hourly Forecast**      | Next 24 hours detailed weather information                 |
| **Air Quality**          | European AQI with 6 pollutants breakdown                   |
| **City Search**          | Search from 1M+ cities worldwide                           |
| **Interactive Data**     | Click any day/hour to see detailed information             |
| **Responsive Design**    | Optimized for mobile, tablet, and desktop                  |
| **Weather Icons**        | Dynamic SVG icons based on weather conditions              |

## 🌐 APIs Used

- **[Open-Meteo Weather API](https://open-meteo.com/)** - Free weather forecast API
  - No API key required
  - No usage limitations
  - Real-time weather data
  - 7-day forecasts

- **[Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api)** - Air pollution data
  - European Air Quality Index
  - 6 pollutants tracking

## 🎨 Usage Examples

### Search for a City
1. Click the search bar at the top
2. Type at least 2 characters of a city name
3. Select from the dropdown results
4. Weather data loads automatically

### View Hourly Forecast
1. Click the "Hour" button in the forecast section
2. Scroll through the next 24 hours
3. Click any hour to see detailed data for that time

### View Weekly Forecast
1. Click the "Week" button (default view)
2. Browse through 7 days
3. Click any day to see that day's weather details

### Check Air Quality Details
1. Scroll to the "Air Quality Index" section
2. Click the "+" button to expand
3. View detailed breakdown of 6 pollutants

## 🛠️ Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with Grid and Flexbox
- **Vanilla JavaScript (ES6+)** - No frameworks, just clean JS
- **Open-Meteo API** - Weather and air quality data
- **SVG** - Dynamic weather icons and data visualizations

## 📄 License

This project is open source and available for educational purposes.

---

*For detailed technical documentation, please explore the `docs/` folder.*