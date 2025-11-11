# Supporting Modules Documentation

This document provides an overview of the supporting JavaScript modules that handle specific functionalities in the Weather Dashboard.

## 📋 Table of Contents
- [search.js - City Search](#searchjs---city-search)
- [ui.js - User Interface Interactions](#uijs---user-interface-interactions)
- [svgCreator.js - Weather Icons](#svgcreatorjs---weather-icons)
- [indexes.js - Data Visualizations](#indexesjs---data-visualizations)
- [airIndexes.js - Air Quality Processing](#airindexesjs---air-quality-processing)
- [weatherDescriptions.js - Weather Translations](#weatherdescriptionsjs---weather-translations)

---

## search.js - City Search

**Purpose:** Implements city search functionality with a 1M+ cities database.

### Key Functions

#### `loadCities()`
Loads the cities.json file (1,237,555 cities).

```javascript
async function loadCities()
```

**Behavior:**
- Loads only once (cached in memory)
- Parses JSON data
- Returns cities array

#### `searchCities(query)`
Searches for cities matching the input query.

```javascript
function searchCities(query)
```

**Parameters:**
- `query` (string) - Search term (minimum 2 characters)

**Returns:** Array of matching cities (max 10 results)

**Features:**
- Case-insensitive search
- Searches city name, country, and subcountry
- Limits results for performance

#### `findClosestCity(lat, lon)`
Finds the closest city to given coordinates (reverse geocoding).

```javascript
function findClosestCity(lat, lon)
```

**Parameters:**
- `lat` (number) - Target latitude
- `lon` (number) - Target longitude

**Returns:** Closest city object or null

**Algorithm:**
- Uses Pythagorean distance approximation
- Early exit if distance < 0.01 degrees (~1km)
- Linear search through database

**Exposed globally:**
```javascript
window.findClosestCity = findClosestCity;
```

#### `setupSearch()`
Initializes search functionality for both mobile and desktop forms.

```javascript
function setupSearch()
```

**Features:**
- Dual search inputs (mobile + desktop)
- Triggers on 2+ characters typed
- Displays results in dropdown
- Navigates to new location on click
- Hides results when clicking outside

---

## ui.js - User Interface Interactions

**Purpose:** Handles miscellaneous UI interactions and animations.

### Key Features

#### Air Quality Details Toggle
Expands/collapses detailed pollutant information.

```javascript
const detailsButton = document.querySelector('#moreDetailsBottom');
```

**Behavior:**
- Toggles `.AirDetails` visibility
- Changes button text: "+" ↔ "-"
- Smooth transition animation

#### Future Enhancements
This file is designed for additional UI interactions such as:
- Modal dialogs
- Loading indicators
- Toast notifications
- Theme switchers

---

## svgCreator.js - Weather Icons

**Purpose:** Generates dynamic SVG weather icons based on weather codes.

### Main Function

#### `getWeatherSVG(weatherCode)`
Creates appropriate weather icon for given WMO code.

```javascript
export function getWeatherSVG(weatherCode)
```

**Parameters:**
- `weatherCode` (number) - WMO weather code (0-99)

**Returns:** String - SVG markup

### Supported Icons

| Weather Code | Icon                | Description      |
|:-------------|:--------------------|:-----------------|
| 0            | ☀️ Sun              | Clear sky        |
| 1-2          | 🌤️ Partly Cloudy   | Mainly clear     |
| 3            | ☁️ Cloudy           | Overcast         |
| 45-48        | 🌫️ Fog              | Foggy            |
| 51-57        | 🌦️ Drizzle          | Light rain       |
| 61-67        | 🌧️ Rain             | Rain             |
| 71-77        | ❄️ Snow             | Snow             |
| 80-82        | 🌦️ Showers          | Rain showers     |
| 85-86        | 🌨️ Snow Showers     | Snow showers     |
| 95-99        | ⛈️ Thunderstorm     | Thunderstorm     |

### SVG Styling
Icons use CSS variables for:
- Colors matching weather conditions
- Consistent sizing (100×100 viewBox)
- Responsive scaling
- Animation classes (in `animation.css`)

### Example Icons

**Sun (Code 0):**
```svg
<svg viewBox="0 0 100 100" width="100">
  <circle cx="50" cy="50" r="20" fill="#FFD93B" />
  <g class="rays">...</g>
</svg>
```

**Rain (Code 61-67):**
```svg
<svg viewBox="0 0 100 100" width="100">
  <ellipse cx="50" cy="40" ... fill="#BDBDBD" />
  <line class="rain-drop" ... />
</svg>
```

---

## indexes.js - Data Visualizations

**Purpose:** Updates UV Index, Humidity, and Pressure visualizations.

### Functions

#### `updateUVIndex(uvValue)`
Updates UV index display with color-coded level.

```javascript
export const updateUVIndex = (uvValue)
```

**Visual Elements:**
- Circular progress indicator
- Numeric value (0-11+)
- Color-coded level:
  - 🟢 Green: 0-2 (Low)
  - 🟡 Yellow: 3-5 (Moderate)
  - 🟠 Orange: 6-7 (High)
  - 🔴 Red: 8-10 (Very High)
  - 🟣 Purple: 11+ (Extreme)

#### `updateHumidity(humidityValue)`
Updates humidity visualization with water droplet fill.

```javascript
export const updateHumidity = (humidityValue)
```

**Features:**
- Animated water fill (CSS variable `--humidity`)
- Percentage display
- Level indicator:
  - Seco (Dry): < 30%
  - Normal: 30-60%
  - Húmido (Humid): > 60%

#### `updatePressure(pressureValue, cloudValue)`
Updates atmospheric pressure with cloud cover arc.

```javascript
export const updatePressure = (pressureValue, cloudValue)
```

**Displays:**
- Pressure in hPa (hectopascals)
- Cloud cover arc (0-100%)
- Level:
  - Baixa (Low): < 1000 hPa
  - Normal: 1000-1020 hPa
  - Alta (High): > 1020 hPa

### Calculation Details

**UV Progress:**
```javascript
const circumference = 282.6;  // 2πr where r=45
const offset = circumference - (uvValue / 11 * circumference);
```

**Cloud Arc:**
```javascript
const arcLength = 126;
const offset = arcLength - (cloudValue / 100 * arcLength);
```

---

## airIndexes.js - Air Quality Processing

**Purpose:** Processes air quality data and determines pollution levels.

### Functions

#### `getAQILevel(aqi)`
Determines air quality level based on European AQI.

```javascript
export function getAQILevel(aqi)
```

**Parameters:**
- `aqi` (number) - European Air Quality Index (0-100+)

**Returns:**
```javascript
{
  label: string,       // "Good", "Fair", "Moderate", etc.
  description: string, // Detailed health message
  color: string       // Hex color code
}
```

**Levels:**
```javascript
const aqiLevels = {
  good: { range: [0, 20], label: 'Good', color: '#4cd964' },
  fair: { range: [21, 40], label: 'Fair', color: '#FFD93B' },
  moderate: { range: [41, 60], label: 'Moderate', color: '#ff9500' },
  poor: { range: [61, 80], label: 'Poor', color: '#ff3b30' },
  veryPoor: { range: [81, 100], label: 'Very Poor', color: '#8b00ff' },
  extremelyPoor: { range: [101, Infinity], label: 'Extremely Poor', color: '#8b0000' }
};
```

#### `updateMainAirQuality(aqi, label, description)`
Updates the main AQI display circle.

```javascript
export const updateMainAirQuality = (aqi, label, description)
```

**Updates:**
- Circular chart stroke-dasharray
- AQI number
- Level label
- Description text
- Color coding

#### `updateAirDetail(index, name, value)`
Updates individual pollutant detail card.

```javascript
export const updateAirDetail = (index, name, value)
```

**Parameters:**
- `index` (number) - Pollutant index (0-5)
- `name` (string) - Pollutant name
- `value` (number) - Concentration (μg/m³)

**Pollutants Order:**
0. Ozone (O₃)
1. Nitrogen Dioxide (NO₂)
2. PM2.5
3. Carbon Monoxide (CO)
4. PM10
5. Sulfur Dioxide (SO₂)

---

## weatherDescriptions.js - Weather Translations

**Purpose:** Translates WMO weather codes to human-readable descriptions.

### Function

#### `getWeatherDescription(weatherCode)`
Returns simplified weather description.

```javascript
export function getWeatherDescription(weatherCode)
```

**Parameters:**
- `weatherCode` (number) - WMO code (0-99)

**Returns:** String - Weather description

### Mapping Strategy

**Simplified Descriptions:**
- Multiple codes grouped into single descriptions
- Focus on common weather types
- Easy to understand labels

**Examples:**
```javascript
{
  0: 'Clear',
  1: 'Mostly Clear',
  2: 'Partly Cloudy',
  3: 'Cloudy',
  61: 'Rain',      // Instead of "Slight Rain"
  63: 'Rain',      // Instead of "Moderate Rain"
  65: 'Heavy Rain',
  95: 'Thunderstorm'
}
```

**Full Mapping:**
- 0: Clear
- 1: Mostly Clear
- 2: Partly Cloudy
- 3: Cloudy
- 45-48: Foggy
- 51-55: Drizzle
- 56-57: Freezing Drizzle
- 61-63: Rain
- 65: Heavy Rain
- 66-67: Freezing Rain
- 71-77: Snow (75 = Heavy Snow)
- 80-82: Rain Showers (82 = Heavy)
- 85-86: Snow Showers
- 95-99: Thunderstorm

---

## Module Integration Flow

```
User Searches City
    ↓
search.js → searchCities()
    ↓
User Selects City
    ↓
main.js → init()
    ↓
api.js → getWeatherData()
airAPI.js → getAirQualityData()
    ↓
main.js → updateMainWeather()
    ↓
weatherDescriptions.js → getWeatherDescription()
svgCreator.js → getWeatherSVG()
    ↓
main.js → updateHighlights()
    ↓
indexes.js → updateUVIndex()
indexes.js → updateHumidity()
indexes.js → updatePressure()
    ↓
main.js → updateAirQuality()
    ↓
airIndexes.js → getAQILevel()
airIndexes.js → updateMainAirQuality()
airIndexes.js → updateAirDetail() ×6
    ↓
ui.js → User interactions
```

---

## Best Practices

### Performance
- ✅ Cities loaded once and cached
- ✅ Search limited to 10 results
- ✅ Early exit in distance calculations
- ✅ Efficient DOM queries

### Modularity
- ✅ Single responsibility principle
- ✅ Pure functions where possible
- ✅ Clear export/import structure
- ✅ No global pollution (except findClosestCity)

### Maintainability
- ✅ Descriptive function names
- ✅ Consistent code style
- ✅ Configuration objects for mappings
- ✅ Easy to extend with new features

---

## Future Enhancements

### Potential Additions
1. **search.js**
   - Fuzzy search algorithm
   - Search history
   - Favorite locations

2. **ui.js**
   - Dark/light theme toggle
   - Animation preferences
   - Accessibility features

3. **svgCreator.js**
   - Animated weather icons
   - Night/day variants
   - Custom color schemes

4. **indexes.js**
   - Animated transitions
   - Historical comparisons
   - Trend indicators

---

**For main logic details, see [MAIN.md](MAIN.md)**  
**For API integration, see [API.md](API.md)**
