const AIR_QUALITY_API = 'https://air-quality-api.open-meteo.com/v1/air-quality';
export async function getAirQualityData(latitude, longitude) {
  try {
    const params = new URLSearchParams({
      latitude: latitude,
      longitude: longitude,
      current: 'european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone',
      hourly: 'european_aqi',
      timezone: 'auto'
    });
    const response = await fetch(`${AIR_QUALITY_API}?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch air quality data');
    }
    const data = await response.json();
    return {
      current: {
        aqi: data.current.european_aqi,
        pm10: data.current.pm10,
        pm25: data.current.pm2_5,
        co: data.current.carbon_monoxide,
        no2: data.current.nitrogen_dioxide,
        so2: data.current.sulphur_dioxide,
        ozone: data.current.ozone
      },
      hourly: data.hourly,
      location: {
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone
      }
    };
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    throw error;
  }
}
