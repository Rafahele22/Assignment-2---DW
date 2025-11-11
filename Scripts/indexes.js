export const getUVLevel = (uv) => {
  if (uv <= 2) return { label: 'Baixo', color: '#4cd964' };
  if (uv <= 5) return { label: 'Moderado', color: '#FFD93B' };
  if (uv <= 7) return { label: 'Alto', color: '#ff9500' };
  if (uv <= 10) return { label: 'Muito Alto', color: '#ff3b30' };
  return { label: 'Extremo', color: '#8b00ff' };
};

export const getHumidityLevel = (humidity) => {
  if (humidity < 30) return { label: 'Seco', color: '#ff9500' };
  if (humidity <= 60) return { label: 'Normal', color: '#4cd964' };
  return { label: 'Húmido', color: '#0288D1' };
};

export const getPressureLevel = (pressure) => {
  if (pressure < 1000) return { label: 'Baixa', color: '#ff9500' };
  if (pressure <= 1020) return { label: 'Normal', color: '#4cd964' };
  return { label: 'Alta', color: '#0288D1' };
};

export const updateUVIndex = (uvValue) => {
  const uvBox = document.querySelector('.contentorBoxInfo .elementBox:nth-child(1)');
  const { label, color } = getUVLevel(uvValue);
  const uvCircle = uvBox.querySelector('.progress');
  const uvText = uvBox.querySelector('.value');
  const uvLabel = uvBox.querySelector('.elementBoxSpan .values span:nth-child(2)');
  uvText.textContent = Math.round(uvValue);
  uvLabel.textContent = label;
  uvCircle.style.stroke = color;
  const circumference = 282.6;
  const offset = circumference - (uvValue / 11 * circumference);
  uvCircle.style.strokeDashoffset = offset;
};

export const updateHumidity = (humidityValue) => {
  const humidityBox = document.querySelector('.contentorBoxInfo .elementBox:nth-child(2)');
  const { label, color } = getHumidityLevel(humidityValue);
  const waterFill = humidityBox.querySelector('.water-fill');
  const humidityText = humidityBox.querySelector('.elementBoxSpan .values span:nth-child(1)');
  const humidityLabel = humidityBox.querySelector('.elementBoxSpan .values span:nth-child(2)');
  humidityText.textContent = `${Math.round(humidityValue)} %`;
  humidityLabel.textContent = label;
  const gradient = waterFill.parentElement.querySelector('#waterGradient stop:nth-child(2)');
  if (gradient) gradient.setAttribute('stop-color', color);
  humidityBox.querySelector('.humidity-icon').style.setProperty('--humidity', humidityValue);
};

export const updatePressure = (pressureValue, cloudValue) => {
  const pressureBox = document.querySelector('.contentorBoxInfo .elementBox:nth-child(3)');
  const { label, color } = getPressureLevel(pressureValue);
  const cloudCircle = pressureBox.querySelector('.progress2');
  const cloudText = pressureBox.querySelector('.value');
  const pressureText = pressureBox.querySelector('.elementBoxSpan .values span:nth-child(1)');
  const pressureLabel = pressureBox.querySelector('.elementBoxSpan .values span:nth-child(2)');
  cloudText.textContent = `${Math.round(cloudValue)}%`;
  pressureText.textContent = `${Math.round(pressureValue)} hPa`;
  pressureLabel.textContent = label;
  cloudCircle.style.stroke = color;
  const arcLength = 126;
  const offset = arcLength - (cloudValue / 100 * arcLength);
  cloudCircle.style.strokeDashoffset = offset;
};
