export const getAQILevel = (aqi) => {
  if (aqi <= 20) return { label: 'Good', color: '#4cd964', description: 'Air quality is considered satisfactory, and air pollution poses little or no risk.' };
  if (aqi <= 40) return { label: 'Fair', color: '#a0d568', description: 'Air quality is acceptable; however, there may be a moderate health concern for a very small number of people.' };
  if (aqi <= 60) return { label: 'Moderate', color: '#FFD93B', description: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.' };
  if (aqi <= 80) return { label: 'Poor', color: '#ff9500', description: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.' };
  if (aqi <= 100) return { label: 'Very Poor', color: '#ff3b30', description: 'Health warnings of emergency conditions. The entire population is more likely to be affected.' };
  return { label: 'Extremely Poor', color: '#8b00ff', description: 'Health alert: everyone may experience more serious health effects.' };
};

export const getOzoneLevel = (value) => {
  if (value <= 50) return { label: 'Good', color: '#4cd964' };
  if (value <= 100) return { label: 'Fair', color: '#a0d568' };
  if (value <= 130) return { label: 'Moderate', color: '#FFD93B' };
  if (value <= 240) return { label: 'Poor', color: '#ff9500' };
  if (value <= 380) return { label: 'Very Poor', color: '#ff3b30' };
  return { label: 'Extremely Poor', color: '#8b00ff' };
};

export const getNO2Level = (value) => {
  if (value <= 40) return { label: 'Good', color: '#4cd964' };
  if (value <= 90) return { label: 'Fair', color: '#a0d568' };
  if (value <= 120) return { label: 'Moderate', color: '#FFD93B' };
  if (value <= 230) return { label: 'Poor', color: '#ff9500' };
  if (value <= 340) return { label: 'Very Poor', color: '#ff3b30' };
  return { label: 'Extremely Poor', color: '#8b00ff' };
};

export const getPM25Level = (value) => {
  if (value <= 10) return { label: 'Good', color: '#4cd964' };
  if (value <= 20) return { label: 'Fair', color: '#a0d568' };
  if (value <= 25) return { label: 'Moderate', color: '#FFD93B' };
  if (value <= 50) return { label: 'Poor', color: '#ff9500' };
  if (value <= 75) return { label: 'Very Poor', color: '#ff3b30' };
  return { label: 'Extremely Poor', color: '#8b00ff' };
};

export const getCOLevel = (value) => {
  if (value <= 4000) return { label: 'Good', color: '#4cd964' };
  if (value <= 7000) return { label: 'Fair', color: '#a0d568' };
  if (value <= 10000) return { label: 'Moderate', color: '#FFD93B' };
  if (value <= 20000) return { label: 'Poor', color: '#ff9500' };
  if (value <= 30000) return { label: 'Very Poor', color: '#ff3b30' };
  return { label: 'Extremely Poor', color: '#8b00ff' };
};

export const getPM10Level = (value) => {
  if (value <= 20) return { label: 'Good', color: '#4cd964' };
  if (value <= 35) return { label: 'Fair', color: '#a0d568' };
  if (value <= 50) return { label: 'Moderate', color: '#FFD93B' };
  if (value <= 100) return { label: 'Poor', color: '#ff9500' };
  if (value <= 150) return { label: 'Very Poor', color: '#ff3b30' };
  return { label: 'Extremely Poor', color: '#8b00ff' };
};

export const getSO2Level = (value) => {
  if (value <= 100) return { label: 'Good', color: '#4cd964' };
  if (value <= 200) return { label: 'Fair', color: '#a0d568' };
  if (value <= 350) return { label: 'Moderate', color: '#FFD93B' };
  if (value <= 500) return { label: 'Poor', color: '#ff9500' };
  if (value <= 750) return { label: 'Very Poor', color: '#ff3b30' };
  return { label: 'Extremely Poor', color: '#8b00ff' };
};

export const updateMainAirQuality = (aqiValue, aqiLabel, description) => {
  const mainAQI = document.querySelector('.AirQualityContentor');
  const aqiCircle = mainAQI.querySelector('.circle');
  const aqiText = mainAQI.querySelector('.percentage');
  const aqiLabelSpan = mainAQI.querySelector('.AirText span:nth-child(1)');
  const aqiDescription = mainAQI.querySelector('.AirText span:nth-child(2)');
  
  const { color } = getAQILevel(aqiValue);
  
  aqiText.textContent = Math.round(aqiValue);
  aqiLabelSpan.textContent = aqiLabel;
  aqiDescription.textContent = description;
  aqiCircle.style.stroke = color;
  
  const circumference = 100;
  const normalizedValue = Math.min(aqiValue, 100);
  const offset = circumference - (normalizedValue / 100 * circumference);
  aqiCircle.setAttribute('stroke-dasharray', `${normalizedValue}, ${circumference}`);
};

export const updateAirDetail = (index, name, value, maxValue = 100) => {
  const details = document.querySelectorAll('.AirDetails > div');
  if (!details[index]) return;
  
  let level, formattedValue;
  
  switch(name) {
    case 'Ozone':
      level = getOzoneLevel(value);
      formattedValue = `${value.toFixed(2)} µg/m³`;
      maxValue = 380;
      break;
    case 'Nitrogen Dioxide':
      level = getNO2Level(value);
      formattedValue = `${value.toFixed(2)} µg/m³`;
      maxValue = 340;
      break;
    case 'PM2.5':
      level = getPM25Level(value);
      formattedValue = `${value.toFixed(2)} µg/m³`;
      maxValue = 75;
      break;
    case 'Carbon Monoxide':
      level = getCOLevel(value);
      formattedValue = `${value.toFixed(2)} µg/m³`;
      maxValue = 30000;
      break;
    case 'PM10':
      level = getPM10Level(value);
      formattedValue = `${value.toFixed(2)} µg/m³`;
      maxValue = 150;
      break;
    case 'Sulfur Dioxide':
      level = getSO2Level(value);
      formattedValue = `${value.toFixed(2)} µg/m³`;
      maxValue = 750;
      break;
    default:
      return;
  }
  
  const detail = details[index];
  const circle = detail.querySelector('.circle');
  const percentage = detail.querySelector('.percentage');
  const nameSpan = detail.querySelector('div:nth-child(2) span:nth-child(1)');
  const levelSpan = detail.querySelector('div:nth-child(2) span:nth-child(2)');
  const valueSpan = detail.querySelector('div:nth-child(2) span:nth-child(3)');
  
  percentage.textContent = Math.round((value / maxValue) * 100);
  nameSpan.textContent = name;
  levelSpan.textContent = level.label;
  valueSpan.textContent = formattedValue;
  circle.style.stroke = level.color;
  
  const circumference = 100;
  const normalizedValue = Math.min((value / maxValue) * 100, 100);
  circle.setAttribute('stroke-dasharray', `${normalizedValue}, ${circumference}`);
};
