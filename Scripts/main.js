import { getWeatherData } from './api.js';

function getURLParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    latitude: params.get('latitude'),
    longitude: params.get('longitude')
  };
}

async function init() {
  const { latitude, longitude } = getURLParams();
  try {
    const data = await getWeatherData(latitude, longitude);
    console.log(data);
    
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}

document.addEventListener('DOMContentLoaded', init);
