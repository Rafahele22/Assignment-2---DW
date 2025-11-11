# Main.js Documentation

The `main.js` file is the heart of the Weather Dashboard application. It orchestrates all components, manages application state, handles user interactions, and coordinates data flow between the APIs and the UI.

## 📋 Table of Contents
- [Overview](#overview)
- [Application State](#application-state)
- [Core Functions](#core-functions)
- [Data Update Functions](#data-update-functions)
- [User Interaction Functions](#user-interaction-functions)
- [Initialization](#initialization)

## Overview

**File:** `Scripts/main.js`  
**Type:** ES6 Module  
**Purpose:** Central controller for the weather dashboard

### Dependencies
```javascript
import { getWeatherData } from './api.js';
import { getAirQualityData } from './airAPI.js';
import { getWeatherSVG, getCloudSVG } from './svgCreator.js';
import { updateUVIndex, updateHumidity, updatePressure } from './indexes.js';
import { updateMainAirQuality, updateAirDetail, getAQILevel } from './airIndexes.js';
import { getWeatherDescription } from './weatherDescriptions.js';
```

## Application State

The application maintains two primary state variables:

```javascript
let weatherData = null;      // Stores all weather information
let airQualityData = null;   // Stores air quality measurements
let currentView = 'week';    // Tracks whether showing 'week' or 'hour' view
```

### Weather Data Structure
```javascript
{
  current: {
    temp, feelsLike, humidity, precipitation,
    weatherCode, clouds, windSpeed, pressure
  },
  hourly: {
    temperature_2m[], apparent_temperature[],
    weather_code[], cloud_cover[], wind_speed_10m[],
    precipitation[], relative_humidity_2m[], surface_pressure[]
  },
  daily: {
    temperature_2m_max[], temperature_2m_min[],
    weather_code[], uv_index_max[],
    wind_speed_10m_max[], precipitation_sum[]
  },
  location: { latitude, longitude, timezone }
}
```

## Core Functions

### `getURLParams()`
Extracts location parameters from the URL query string.

```javascript
function getURLParams()
```

**Returns:** `{ latitude: number, longitude: number }`

**Default:** Lisbon, Portugal (38.7223, -9.1393)

**Usage:**
```javascript
const { latitude, longitude } = getURLParams();
// From: ?latitude=51.5074&longitude=-0.1278
```

---

### `getDayName(dateString)`
Converts a date string to a Portuguese day abbreviation.

```javascript
function getDayName(dateString)
```

**Parameters:**
- `dateString` (string) - ISO date format (e.g., "2025-11-11")

**Returns:** String - Day abbreviation ('Dom', 'Seg', 'Ter', etc.)

---

### `getHourFromDatetime(datetime)`
Extracts hour from datetime string in HH:00 format.

```javascript
function getHourFromDatetime(datetime)
```

**Parameters:**
- `datetime` (string) - ISO datetime string

**Returns:** String - Formatted hour (e.g., "14:00")

---

### `updateLocationName(latitude, longitude)`
Updates the displayed location name using reverse geocoding.

```javascript
function updateLocationName(latitude, longitude)
```

**Parameters:**
- `latitude` (number) - Location latitude
- `longitude` (number) - Location longitude

**Behavior:**
1. Calls `window.findClosestCity()` from `search.js`
2. Updates `.localInfo` element with "City, Country"
3. Falls back to coordinates if city not found
4. Error handling with console logging

---

## Data Update Functions

### `updateMainWeather()`
Updates the main weather display with current conditions.

```javascript
function updateMainWeather()
```

**Updates:**
- Location name
- Current day and date
- Temperature and feels-like
- Weather icon (SVG)
- Weather description (e.g., "Clear", "Rain")
- Wind speed
- Precipitation amount

**DOM Elements Modified:**
- `.localInfo` - Location name
- `.day` - Day of week
- `.date` - Formatted date
- `.tempPrinc > span` - Temperature
- `.actualStatus span` - Weather description and feels-like
- `.windHumityContentor` - Wind and precipitation

---

### `updateDataForHour(hourIndex)`
Updates all data when a specific hour is clicked.

```javascript
function updateDataForHour(hourIndex)
```

**Parameters:**
- `hourIndex` (number) - Index in the hourly data array

**Updates:**
- Temperature for that hour
- Feels-like temperature
- Weather icon and description
- Wind speed
- Precipitation
- Humidity
- Atmospheric pressure
- Cloud cover

**Console Logging:**
- Logs hourly data for debugging
- Logs extracted values

---

### `updateDataForDay(dayIndex)`
Updates all data when a specific day is clicked.

```javascript
function updateDataForDay(dayIndex)
```

**Parameters:**
- `dayIndex` (number) - Index in the daily data array (0-6)

**Updates:**
- Average temperature (between min and max)
- Temperature range (min-max display)
- Weather icon and description
- Maximum wind speed
- Total precipitation
- UV index for that day

**Special Behavior:**
- Displays temperature range instead of "feels like"
- Shows daily totals and maximums

---

### `fillWeeklyForecast(dailyData)`
Populates the 7-day forecast view with clickable day boxes.

```javascript
function fillWeeklyForecast(dailyData)
```

**Parameters:**
- `dailyData` (object) - Daily weather data from API

**Creates:**
- 7 `.dateBox` elements
- Each with day name, weather icon, and temp range
- Click handlers to update main display
- Visual selection indicator (first day selected by default)

---

### `fillHourlyForecast(hourlyData)`
Populates the 24-hour forecast view with clickable hour boxes.

```javascript
function fillHourlyForecast(hourlyData)
```

**Parameters:**
- `hourlyData` (object) - Hourly weather data from API

**Logic:**
1. Finds current hour in the data
2. Shows next 24 hours from now
3. Creates `.dateBox` for each hour
4. Adds click handlers
5. First hour selected by default

---

## User Interaction Functions

### `updateAirQuality()`
Updates the air quality display with current AQI and pollutants.

```javascript
const updateAirQuality = () => { ... }
```

**Updates:**
- Main AQI circle and percentage
- AQI level label and description
- 6 individual pollutant readings:
  - Ozone (O₃)
  - Nitrogen Dioxide (NO₂)
  - PM2.5
  - Carbon Monoxide (CO)
  - PM10
  - Sulfur Dioxide (SO₂)

---

### `updateHighlights()`
Updates the "Day's Highlights" section based on current view.

```javascript
const updateHighlights = () => { ... }
```

**Behavior:**
- **Week view:** Uses current weather data
- **Hour view:** Uses hourly-specific data

**Updates:**
- UV Index with color-coded level
- Humidity percentage with visual indicator
- Atmospheric pressure with cloud cover arc

---

### `setupViewToggle()`
Configures the Hour/Week toggle buttons.

```javascript
function setupViewToggle()
```

**Functionality:**
- Switches between hourly and weekly forecast views
- Updates button styles (.select / .unSelect)
- Calls appropriate fill function
- Updates highlights for new view
- Event listeners on both buttons

---

## Initialization

### `init()`
Main initialization function called on page load.

```javascript
async function init()
```

**Execution Flow:**
1. Extract latitude/longitude from URL
2. Fetch weather and air quality data in parallel (`Promise.all`)
3. Log data to console (for debugging)
4. Update main weather display
5. Fill weekly forecast (default view)
6. Update highlights section
7. Update air quality section
8. Setup view toggle handlers
9. Error handling with console logging

**Trigger:**
```javascript
document.addEventListener('DOMContentLoaded', init);
```

---

## Function Call Flow

```
Page Load
    ↓
init()
    ↓
├─→ getURLParams()
├─→ getWeatherData() (from api.js)
├─→ getAirQualityData() (from airAPI.js)
    ↓
├─→ updateMainWeather()
│   ├─→ updateLocationName()
│   ├─→ getWeatherSVG()
│   └─→ getWeatherDescription()
│
├─→ fillWeeklyForecast()
│   └─→ User clicks day → updateDataForDay()
│
├─→ updateHighlights()
│   ├─→ updateUVIndex()
│   ├─→ updateHumidity()
│   └─→ updatePressure()
│
├─→ updateAirQuality()
│   ├─→ getAQILevel()
│   ├─→ updateMainAirQuality()
│   └─→ updateAirDetail() (×6)
│
└─→ setupViewToggle()
    └─→ User clicks Hour → fillHourlyForecast()
        └─→ User clicks hour → updateDataForHour()
```

---

## Best Practices Used

✅ **Modular Design** - Clear separation of concerns  
✅ **Error Handling** - Try-catch blocks and fallbacks  
✅ **Console Logging** - Debugging information  
✅ **ES6 Syntax** - Arrow functions, const/let, async/await  
✅ **DOM Manipulation** - Efficient querySelector usage  
✅ **Event Delegation** - Dynamic element click handlers  
✅ **State Management** - Global state variables  
✅ **Async Operations** - Parallel API calls with Promise.all

---

## Common Modifications

### Change Default Location
```javascript
return {
  latitude: latitude || 40.7128,  // New York
  longitude: longitude || -74.0060
};
```

### Add More Days to Forecast
```javascript
// In fillWeeklyForecast
dailyData.time.slice(0, 14).forEach(...) // 14 days
```

### Change Temperature Units
Currently uses Celsius. Modify API call in `api.js` to add `temperature_unit=fahrenheit`.

---

**For API integration details, see [API.md](API.md)**  
**For module overviews, see [MODULES.md](MODULES.md)**
