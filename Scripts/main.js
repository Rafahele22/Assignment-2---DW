import { getWeatherData } from './api.js';
import { getAirQualityData } from './airAPI.js';
import { getWeatherSVG, getCloudSVG } from './svgCreator.js';
import { updateUVIndex, updateHumidity, updatePressure } from './indexes.js';
import { updateMainAirQuality, updateAirDetail, getAQILevel } from './airIndexes.js';
import { getWeatherDescription } from './weatherDescriptions.js';

let weatherData = null;
let airQualityData = null;
let currentView = 'week';

function getURLParams() {
  const params = new URLSearchParams(window.location.search);
  const latitude = params.get('latitude');
  const longitude = params.get('longitude');
  
  //caso erro
  return {
    latitude: latitude || 38.7223,
    longitude: longitude || -9.1393
  };
}

function getDayName(dateString) {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const date = new Date(dateString);
  return days[date.getDay()];
}

function getHourFromDatetime(datetime) {
  const date = new Date(datetime);
  return `${String(date.getHours()).padStart(2, '0')}:00`;
}

function updateLocationName(latitude, longitude) {
  try {
    if (typeof window.findClosestCity === 'function') {
      const closestCity = window.findClosestCity(latitude, longitude);
      
      if (closestCity) {
        document.querySelector('.localInfo').textContent = `${closestCity.name}, ${closestCity.country}`;
      } else {
        document.querySelector('.localInfo').textContent = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
      }
    } else {
      document.querySelector('.localInfo').textContent = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
    }
  } catch (error) {
    console.error('Error updating location name:', error);
    document.querySelector('.localInfo').textContent = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
  }
}

function updateDataForHour(hourIndex) {
  if (!weatherData) return;
  
  console.log('Updating for hour index:', hourIndex);
  console.log('Hourly data:', weatherData.hourly);
  
  const temp = Math.round(weatherData.hourly.temperature_2m[hourIndex]);
  const feelsLike = Math.round(weatherData.hourly.apparent_temperature[hourIndex]);
  const weatherCode = weatherData.hourly.weather_code[hourIndex];
  const weatherDescription = getWeatherDescription(weatherCode);
  const weatherIcon = getWeatherSVG(weatherCode);
  const windSpeed = Math.round(weatherData.hourly.wind_speed_10m[hourIndex]);
  const precipitation = weatherData.hourly.precipitation[hourIndex];
  const humidity = weatherData.hourly.relative_humidity_2m[hourIndex];
  const pressure = weatherData.hourly.surface_pressure[hourIndex];
  const clouds = weatherData.hourly.cloud_cover[hourIndex];
  
  console.log('Hour data:', { temp, feelsLike, weatherCode, windSpeed, precipitation });
  
  document.querySelector('.tempPrinc .center').innerHTML = weatherIcon;
  document.querySelector('.tempPrinc > span').textContent = `${temp}°`;
  document.querySelector('.actualStatus span:nth-child(1)').textContent = weatherDescription;
  document.querySelector('.actualStatus span:nth-child(2)').textContent = `Feel like ${feelsLike}°`;
  document.querySelector('.windHumityContentor div:nth-child(1) span:nth-child(2)').textContent = `${windSpeed} km/h`;
  document.querySelector('.windHumityContentor div:nth-child(2) span:nth-child(2)').textContent = precipitation > 0 ? `${precipitation.toFixed(1)} mm` : 'None';
  
  const uvIndex = weatherData.daily.uv_index_max[0];
  updateUVIndex(uvIndex);
  updateHumidity(humidity);
  updatePressure(pressure, clouds);
}

function updateDataForDay(dayIndex) {
  if (!weatherData) return;
  
  console.log('Updating for day index:', dayIndex);
  console.log('Daily data:', weatherData.daily);
  
  const tempMax = Math.round(weatherData.daily.temperature_2m_max[dayIndex]);
  const tempMin = Math.round(weatherData.daily.temperature_2m_min[dayIndex]);
  const weatherCode = weatherData.daily.weather_code[dayIndex];
  const weatherDescription = getWeatherDescription(weatherCode);
  const weatherIcon = getWeatherSVG(weatherCode);
  const windSpeed = Math.round(weatherData.daily.wind_speed_10m_max[dayIndex]);
  const precipitation = weatherData.daily.precipitation_sum[dayIndex];
  const uvIndex = weatherData.daily.uv_index_max[dayIndex];
  
  const avgTemp = Math.round((tempMax + tempMin) / 2);
  
  console.log('Day data:', { avgTemp, tempMin, tempMax, weatherCode, windSpeed, precipitation });
  
  document.querySelector('.tempPrinc .center').innerHTML = weatherIcon;
  document.querySelector('.tempPrinc > span').textContent = `${avgTemp}°`;
  document.querySelector('.actualStatus span:nth-child(1)').textContent = weatherDescription;
  document.querySelector('.actualStatus span:nth-child(2)').textContent = `${tempMin}° - ${tempMax}°`;
  document.querySelector('.windHumityContentor div:nth-child(1) span:nth-child(2)').textContent = `${windSpeed} km/h`;
  document.querySelector('.windHumityContentor div:nth-child(2) span:nth-child(2)').textContent = precipitation > 0 ? `${precipitation.toFixed(1)} mm` : 'None';
  
  updateUVIndex(uvIndex);
  updateHumidity(weatherData.current.humidity);
  updatePressure(weatherData.current.pressure, weatherData.current.clouds);
}

function updateMainWeather() {
  if (!weatherData) return;
  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayName = days[now.getDay()];

  const date = `${String(now.getDate()).padStart(2, '0')} ${months[now.getMonth()]}, ${now.getFullYear()}`;
  
  console.log(weatherData);

  updateLocationName(weatherData.location.latitude, weatherData.location.longitude);
  
  document.querySelector('.day').textContent = dayName;
  document.querySelector('.date').textContent = date;

  const temp = Math.round(weatherData.current.temp);
  const feelsLike = Math.round(weatherData.current.feelsLike);
  const weatherCode = weatherData.current.weatherCode;
  const weatherIcon = getWeatherSVG(weatherCode);
  const iconContainer = document.querySelector('.tempPrinc .center');
  iconContainer.innerHTML = weatherIcon;

  document.querySelector('.tempPrinc > span').textContent = `${temp}°`;
  
  const weatherDescription = getWeatherDescription(weatherCode);
  document.querySelector('.actualStatus span:nth-child(1)').textContent = weatherDescription;
  document.querySelector('.actualStatus span:nth-child(2)').textContent = `Feel like ${feelsLike}°`;
  
  const windSpeed = weatherData.current.windSpeed;
  const precipitation = weatherData.current.precipitation;
  document.querySelector('.windHumityContentor div:nth-child(1) span:nth-child(2)').textContent = `${windSpeed} km/h`;
  document.querySelector('.windHumityContentor div:nth-child(2) span:nth-child(2)').textContent = precipitation > 0 ? `${precipitation.toFixed(1)} mm` : 'None';
}

function fillWeeklyForecast(dailyData) {
  const container = document.querySelector('.Contentor4ten');
  container.innerHTML = '';

  dailyData.time.slice(0, 7).forEach((dateStr, i) => {
    const dayName = getDayName(dateStr);
    const tempMax = Math.round(dailyData.temperature_2m_max[i]);
    const tempMin = Math.round(dailyData.temperature_2m_min[i]);
    const weatherCode = dailyData.weather_code[i];
    const weatherIcon = getWeatherSVG(weatherCode);

    const dateBox = document.createElement('div');
    dateBox.className = 'dateBox';
    if (i === 0) dateBox.classList.add('selected');
    dateBox.innerHTML = `
      <div>${dayName}</div>
      <div class="center">
        ${weatherIcon}
      </div>
      <div class="center">
        <span>${tempMax}°</span>
        <span> ${tempMin}°</span>
      </div>
    `;
    
    dateBox.addEventListener('click', () => {
      document.querySelectorAll('.dateBox').forEach(box => box.classList.remove('selected'));
      dateBox.classList.add('selected');
      updateDataForDay(i);
    });
    
    container.appendChild(dateBox);
  });
}

function fillHourlyForecast(hourlyData) {
  const container = document.querySelector('.Contentor4ten');
  container.innerHTML = '';

  const now = new Date();
  
  const startIndex = hourlyData.time.findIndex(time => {
    const date = new Date(time);
    return date >= now;
  });

  if (startIndex === -1) return;

  const endIndex = Math.min(startIndex + 24, hourlyData.time.length);
  const hoursToShow = hourlyData.time.slice(startIndex, endIndex);

  for (const [index, datetime] of hoursToShow.entries()) {
    const hour = getHourFromDatetime(datetime);
    const temp = Math.round(hourlyData.temperature_2m[startIndex + index]);
    const weatherCode = hourlyData.weather_code[startIndex + index];
    const weatherIcon = getWeatherSVG(weatherCode);

    const dateBox = document.createElement('div');
    dateBox.className = 'dateBox';
    if (index === 0) dateBox.classList.add('selected');
    dateBox.innerHTML = `
      <div>${hour}</div>
      <div class="center">
        ${weatherIcon}
      </div>
      <div class="center">
        <span>${temp}°</span>
        <span style="display:none;"></span>
      </div>
    `;
    
    const hourIndex = startIndex + index;
    dateBox.addEventListener('click', () => {
      document.querySelectorAll('.dateBox').forEach(box => box.classList.remove('selected'));
      dateBox.classList.add('selected');
      updateDataForHour(hourIndex);
    });
    
    container.appendChild(dateBox);
  }
}

const updateAirQuality = () => {
  if (!airQualityData) return;
  
  const aqi = airQualityData.current.aqi;
  const { label, description } = getAQILevel(aqi);
  
  updateMainAirQuality(aqi, label, description);
  
  updateAirDetail(0, 'Ozone', airQualityData.current.ozone);
  updateAirDetail(1, 'Nitrogen Dioxide', airQualityData.current.no2);
  updateAirDetail(2, 'PM2.5', airQualityData.current.pm25);
  updateAirDetail(3, 'Carbon Monoxide', airQualityData.current.co);
  updateAirDetail(4, 'PM10', airQualityData.current.pm10);
  updateAirDetail(5, 'Sulfur Dioxide', airQualityData.current.so2);
};

const updateHighlights = () => {
  if (!weatherData) return;
  
  if (currentView === 'week') {
    const uvIndex = weatherData.daily.uv_index_max[0];
    const humidity = weatherData.current.humidity;
    const pressure = weatherData.current.pressure;
    const clouds = weatherData.current.clouds;
    
    updateUVIndex(uvIndex);
    updateHumidity(humidity);
    updatePressure(pressure, clouds);
  } else {
    const now = new Date();
    const currentHour = now.getHours();
    const startIndex = weatherData.hourly.time.findIndex(time => {
      const date = new Date(time);
      return date.getHours() === currentHour && date.getDate() === now.getDate();
    });
    
    const uvIndex = weatherData.daily.uv_index_max[0];
    const humidity = weatherData.current.humidity;
    const pressure = weatherData.current.pressure;
    const clouds = weatherData.hourly.cloud_cover[startIndex] || weatherData.current.clouds;
    
    updateUVIndex(uvIndex);
    updateHumidity(humidity);
    updatePressure(pressure, clouds);
  }
};

function setupViewToggle() {
  const [hourBtn, weekBtn] = document.querySelectorAll('.ContentorSpan span');
  const toggle = (view) => {
    currentView = view;
    hourBtn.classList.toggle('select', view === 'hour');
    hourBtn.classList.toggle('unSelect', view !== 'hour');
    weekBtn.classList.toggle('select', view === 'week');
    weekBtn.classList.toggle('unSelect', view !== 'week');
    if (weatherData) {
      view === 'hour' ? fillHourlyForecast(weatherData.hourly) : fillWeeklyForecast(weatherData.daily);
      updateHighlights();
    }
  };
  hourBtn.addEventListener('click', () => toggle('hour'));
  weekBtn.addEventListener('click', () => toggle('week'));
}

async function init() {
  const { latitude, longitude } = getURLParams();
  try {
    [weatherData, airQualityData] = await Promise.all([
      getWeatherData(latitude, longitude),
      getAirQualityData(latitude, longitude)
    ]);
    
    console.log('Weather Data:', weatherData);
    console.log('Air Quality Data:', airQualityData);
    
    updateMainWeather();
    fillWeeklyForecast(weatherData.daily);
    updateHighlights();
    updateAirQuality();
    setupViewToggle();
    
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}

document.addEventListener('DOMContentLoaded', init);

