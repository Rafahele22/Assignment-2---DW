# API Integration Documentation

This document details how the Weather Dashboard integrates with external APIs to fetch and process weather and air quality data.

## 📋 Table of Contents
- [Overview](#overview)
- [Weather API (api.js)](#weather-api-apijs)
- [Air Quality API (airAPI.js)](#air-quality-api-airapijs)
- [API Configuration](#api-configuration)
- [Error Handling](#error-handling)
- [Data Structures](#data-structures)

## Overview

The application uses two separate API modules to fetch data from Open-Meteo:
- **api.js** - Weather forecast data
- **airAPI.js** - Air quality measurements

Both APIs are free, require no authentication, and have no documented rate limits.

---

## Weather API (api.js)

**File:** `Scripts/api.js`  
**API Provider:** [Open-Meteo Weather API](https://open-meteo.com/)  
**Endpoint:** `https://api.open-meteo.com/v1/forecast`

### Function: `getWeatherData(latitude, longitude)`

```javascript
export async function getWeatherData(latitude, longitude)
```

### Parameters

| Parameter   | Type   | Description          | Example    |
|:------------|:-------|:---------------------|:-----------|
| `latitude`  | number | Location latitude    | `38.7223`  |
| `longitude` | number | Location longitude   | `-9.1393`  |

### API Request Parameters

```javascript
const params = new URLSearchParams({
  latitude: latitude,
  longitude: longitude,
  current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,wind_speed_10m,pressure_msl',
  hourly: 'temperature_2m,apparent_temperature,weather_code,cloud_cover,wind_speed_10m,precipitation,relative_humidity_2m,surface_pressure',
  daily: 'temperature_2m_max,temperature_2m_min,weather_code,uv_index_max,wind_speed_10m_max,precipitation_sum',
  timezone: 'auto',
  forecast_days: 7
});
```

#### Current Weather Parameters
- `temperature_2m` - Temperature at 2 meters (°C)
- `relative_humidity_2m` - Relative humidity (%)
- `apparent_temperature` - Feels-like temperature (°C)
- `precipitation` - Current precipitation (mm)
- `weather_code` - WMO weather code
- `cloud_cover` - Cloud cover percentage (%)
- `wind_speed_10m` - Wind speed at 10 meters (km/h)
- `pressure_msl` - Atmospheric pressure at sea level (hPa)

#### Hourly Parameters (168 hours = 7 days)
- `temperature_2m` - Hourly temperature
- `apparent_temperature` - Hourly feels-like
- `weather_code` - Hourly weather condition
- `cloud_cover` - Hourly cloud percentage
- `wind_speed_10m` - Hourly wind speed
- `precipitation` - Hourly precipitation
- `relative_humidity_2m` - Hourly humidity
- `surface_pressure` - Hourly surface pressure

#### Daily Parameters (7 days)
- `temperature_2m_max` - Daily maximum temperature
- `temperature_2m_min` - Daily minimum temperature
- `weather_code` - Daily weather condition
- `uv_index_max` - Maximum UV index
- `wind_speed_10m_max` - Maximum wind speed
- `precipitation_sum` - Total daily precipitation

### Return Structure

```javascript
{
  current: {
    temp: number,              // Current temperature
    feelsLike: number,         // Feels-like temperature
    humidity: number,          // Humidity percentage
    precipitation: number,     // Current precipitation
    weatherCode: number,       // WMO code
    clouds: number,           // Cloud cover percentage
    windSpeed: number,        // Wind speed
    pressure: number          // Atmospheric pressure
  },
  hourly: {
    time: string[],                    // ISO datetime strings
    temperature_2m: number[],          // Temperatures
    apparent_temperature: number[],    // Feels-like temps
    weather_code: number[],            // Weather codes
    cloud_cover: number[],             // Cloud percentages
    wind_speed_10m: number[],          // Wind speeds
    precipitation: number[],           // Precipitation amounts
    relative_humidity_2m: number[],    // Humidity values
    surface_pressure: number[]         // Pressure values
  },
  daily: {
    time: string[],                    // Date strings
    temperature_2m_max: number[],      // Max temperatures
    temperature_2m_min: number[],      // Min temperatures
    weather_code: number[],            // Weather codes
    uv_index_max: number[],            // UV indices
    wind_speed_10m_max: number[],      // Max wind speeds
    precipitation_sum: number[]        // Total precipitation
  },
  location: {
    latitude: number,
    longitude: number,
    timezone: string
  }
}
```

### Weather Codes (WMO Standard)

| Code | Description          |
|:-----|:---------------------|
| 0    | Clear sky            |
| 1-3  | Mainly/Partly cloudy |
| 45-48| Fog                  |
| 51-57| Drizzle              |
| 61-67| Rain                 |
| 71-77| Snow                 |
| 80-82| Rain showers         |
| 85-86| Snow showers         |
| 95-99| Thunderstorm         |

See `weatherDescriptions.js` for simplified translations.

### Example Usage

```javascript
import { getWeatherData } from './api.js';

const weatherData = await getWeatherData(51.5074, -0.1278);
console.log(weatherData.current.temp); // Current temperature in London
```

---

## Air Quality API (airAPI.js)

**File:** `Scripts/airAPI.js`  
**API Provider:** [Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api)  
**Endpoint:** `https://air-quality-api.open-meteo.com/v1/air-quality`

### Function: `getAirQualityData(latitude, longitude)`

```javascript
export async function getAirQualityData(latitude, longitude)
```

### Parameters

| Parameter   | Type   | Description          | Example    |
|:------------|:-------|:---------------------|:-----------|
| `latitude`  | number | Location latitude    | `38.7223`  |
| `longitude` | number | Location longitude   | `-9.1393`  |

### API Request Parameters

```javascript
const params = new URLSearchParams({
  latitude: latitude,
  longitude: longitude,
  current: 'european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone',
  timezone: 'auto'
});
```

#### Pollutants Measured
- `european_aqi` - European Air Quality Index (0-100+)
- `pm10` - Particulate Matter < 10μm (μg/m³)
- `pm2_5` - Particulate Matter < 2.5μm (μg/m³)
- `carbon_monoxide` - CO (μg/m³)
- `nitrogen_dioxide` - NO₂ (μg/m³)
- `sulphur_dioxide` - SO₂ (μg/m³)
- `ozone` - O₃ (μg/m³)

### Return Structure

```javascript
{
  current: {
    aqi: number,      // European AQI (0-100+)
    pm10: number,     // PM10 concentration
    pm25: number,     // PM2.5 concentration
    co: number,       // Carbon monoxide
    no2: number,      // Nitrogen dioxide
    so2: number,      // Sulfur dioxide
    ozone: number     // Ozone
  },
  location: {
    latitude: number,
    longitude: number,
    timezone: string
  }
}
```

### European AQI Levels

| AQI Range | Level            | Color    | Description                    |
|:----------|:-----------------|:---------|:-------------------------------|
| 0-20      | Good             | Green    | Air quality is satisfactory    |
| 21-40     | Fair             | Yellow   | Acceptable air quality         |
| 41-60     | Moderate         | Orange   | Sensitive groups affected      |
| 61-80     | Poor             | Red      | Health effects for everyone    |
| 81-100    | Very Poor        | Purple   | Serious health effects         |
| 100+      | Extremely Poor   | Maroon   | Health alert                   |

See `airIndexes.js` for level calculations and descriptions.

### Example Usage

```javascript
import { getAirQualityData } from './airAPI.js';

const airData = await getAirQualityData(51.5074, -0.1278);
console.log(airData.current.aqi); // Current AQI in London
```

---

## API Configuration

### Timezone Handling
Both APIs use `timezone: 'auto'` which automatically detects the timezone based on coordinates. This ensures:
- Correct local times in hourly forecasts
- Accurate sunrise/sunset calculations
- Proper day boundaries

### Forecast Duration
Weather API is configured for **7 days** (`forecast_days: 7`), providing:
- 7 days of daily forecasts
- 168 hours (7 × 24) of hourly data

To extend forecasts:
```javascript
forecast_days: 16  // Maximum supported by Open-Meteo
```

### Units
Default units (can be modified):
- **Temperature:** Celsius (°C)
- **Wind Speed:** km/h
- **Precipitation:** mm
- **Pressure:** hPa (hectopascal)

---

## Error Handling

Both API modules implement consistent error handling:

```javascript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return processedData;
} catch (error) {
  console.error('Error fetching data:', error);
  throw error;
}
```

### Common Error Scenarios

1. **Network Failure**
   - User offline
   - DNS resolution failure
   - Network timeout

2. **Invalid Coordinates**
   - Latitude outside -90 to 90
   - Longitude outside -180 to 180

3. **API Unavailable**
   - 5xx server errors
   - Service maintenance

4. **Rate Limiting** (rare)
   - Although no documented limits exist

### Error Display
Errors are logged to console and caught in `main.js`:

```javascript
try {
  [weatherData, airQualityData] = await Promise.all([...]);
} catch (error) {
  console.error('Erro ao buscar dados:', error);
}
```

---

## Data Structures

### Minimal Example Response

**Weather Data:**
```json
{
  "current": {
    "temperature_2m": 18.5,
    "weather_code": 2
  },
  "hourly": {
    "time": ["2025-11-11T00:00", "2025-11-11T01:00"],
    "temperature_2m": [17.2, 16.8]
  },
  "daily": {
    "time": ["2025-11-11"],
    "temperature_2m_max": [22.1],
    "temperature_2m_min": [14.3]
  }
}
```

**Air Quality Data:**
```json
{
  "current": {
    "european_aqi": 25,
    "pm2_5": 12.3,
    "ozone": 85.4
  }
}
```

---

## Performance Considerations

### Parallel Requests
The application fetches both APIs simultaneously:

```javascript
[weatherData, airQualityData] = await Promise.all([
  getWeatherData(lat, lon),
  getAirQualityData(lat, lon)
]);
```

**Benefits:**
- Faster total load time
- Better user experience
- Reduced perceived latency

### Caching Strategy
Currently no caching implemented. To add browser caching:

```javascript
const cache = await caches.open('weather-cache');
const cachedResponse = await cache.match(url);
if (cachedResponse) return cachedResponse.json();
```

### Data Size
Approximate response sizes:
- Weather API: ~15-20 KB
- Air Quality API: ~2-3 KB
- Total: ~18-23 KB per location

---

## API Limitations & Notes

### Open-Meteo Free Tier
✅ **No API Key Required**  
✅ **No Rate Limits** (fair use expected)  
✅ **No Costs**  
✅ **High Availability** (99.9%+ uptime)

### Data Update Frequency
- Weather: Updated hourly
- Air Quality: Updated hourly
- Historical data: Previous 7 days available

### Geographic Coverage
🌍 **Worldwide** - All land locations supported

---

## Testing APIs

### Manual Testing with cURL

**Weather API:**
```bash
curl "https://api.open-meteo.com/v1/forecast?latitude=38.7223&longitude=-9.1393&current=temperature_2m&timezone=auto"
```

**Air Quality API:**
```bash
curl "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=38.7223&longitude=-9.1393&current=european_aqi&timezone=auto"
```

### Browser Testing
Open browser console and test:
```javascript
fetch('https://api.open-meteo.com/v1/forecast?latitude=38.7223&longitude=-9.1393&current=temperature_2m')
  .then(r => r.json())
  .then(console.log);
```

---

**For main application logic, see [MAIN.md](MAIN.md)**  
**For supporting modules, see [MODULES.md](MODULES.md)**
