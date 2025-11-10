const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export async function getWeatherData(latitude, longitude) {
  try {
    const params = new URLSearchParams({
      latitude: latitude,
      longitude: longitude,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,wind_speed_10m,pressure_msl',
      daily: 'temperature_2m_max,temperature_2m_min,weather_code',
      timezone: 'auto'
    });
    
    const response = await fetch(`${WEATHER_API}?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    
    return {
      current: {
        temp: data.current.temperature_2m,
        feelsLike: data.current.apparent_temperature,
        humidity: data.current.relative_humidity_2m,
        precipitation: data.current.precipitation,
        weatherCode: data.current.weather_code,
        clouds: data.current.cloud_cover,
        windSpeed: data.current.wind_speed_10m,
        pressure: data.current.pressure_msl
      },
      daily: data.daily,
      location: {
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone
      }
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}
