import { getWeatherData } from './api.js';

function getURLParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    latitude: params.get('latitude'),
    longitude: params.get('longitude')
  };
}

function getDayName(dateString) {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const date = new Date(dateString);
  return days[date.getDay()];
}

function fillForecast(dailyData) {
  const container = document.querySelector('.Contentor4ten');
  container.innerHTML = '';

  dailyData.time.slice(0, 7).forEach((dateStr, i) => {
    const dayName = getDayName(dateStr);
    const tempMax = Math.round(dailyData.temperature_2m_max[i]);
    const tempMin = Math.round(dailyData.temperature_2m_min[i]);

    const dateBox = document.createElement('div');
    dateBox.className = 'dateBox';
    dateBox.innerHTML = `
      <div>${dayName}</div>
      <div></div>
      <div class="center">
        <span>${tempMax}°</span>
        <span> ${tempMin}°</span>
      </div>
    `;
    container.appendChild(dateBox);
  });
}

async function init() {
  const { latitude, longitude } = getURLParams();
  try {
    const data = await getWeatherData(latitude, longitude);
    console.log(data);
    
    // Preenche as dateBoxes com a previsão
    fillForecast(data.daily);
    
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}

document.addEventListener('DOMContentLoaded', init);

