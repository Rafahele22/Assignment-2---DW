export function getSunSVG() {
  return `
    <svg viewBox="0 0 100 100" class="secIcon2">
      <circle cx="50" cy="50" r="20" fill="#FFD93B" />
      <g class="rays" stroke="#FFD93B" stroke-width="4">
        <line x1="50" y1="5" x2="50" y2="20" />
        <line x1="50" y1="80" x2="50" y2="95" />
        <line x1="5" y1="50" x2="20" y2="50" />
        <line x1="80" y1="50" x2="95" y2="50" />
        <line x1="20" y1="20" x2="30" y2="30" />
        <line x1="70" y1="70" x2="80" y2="80" />
        <line x1="20" y1="80" x2="30" y2="70" />
        <line x1="70" y1="30" x2="80" y2="20" />
      </g>
    </svg>
  `;
}
export function getCloudSVG() {
  return `
    <svg viewBox="0 0 100 60" class="secIcon">
      <g class="cloud" fill="#B0C4DE">
        <circle cx="30" cy="30" r="15"/>
        <circle cx="45" cy="25" r="20"/>
        <circle cx="60" cy="30" r="15"/>
        <rect x="30" y="30" width="30" height="15" />
      </g>
    </svg>
  `;
}
export function getRainSVG() {
  return `
    <svg viewBox="0 0 100 60" class="secIcon">
      <g class="cloud" fill="#B0C4DE">
        <circle cx="30" cy="30" r="15"/>
        <circle cx="45" cy="25" r="20"/>
        <circle cx="60" cy="30" r="15"/>
        <rect x="30" y="30" width="30" height="15" />
      </g>
      <g class="raindrops" stroke="#00BFFF" stroke-width="2">
        <line x1="40" y1="30" x2="40" y2="45" />
        <line x1="50" y1="30" x2="50" y2="45" />
        <line x1="60" y1="30" x2="60" y2="45" />
      </g>
    </svg>
  `;
}
export function getWeatherSVG(weatherCode) {
  if (weatherCode === 0 || weatherCode === 1) {
    return getSunSVG();
  }
  if (weatherCode === 2 || weatherCode === 3 || weatherCode === 45 || weatherCode === 48) {
    return getCloudSVG();
  }
  if (weatherCode >= 51 && weatherCode <= 67) {
    return getRainSVG();
  }
  if (weatherCode >= 80 && weatherCode <= 82) {
    return getRainSVG();
  }
  if (weatherCode >= 95 && weatherCode <= 99) {
    return getRainSVG();
  }
  if (weatherCode >= 71 && weatherCode <= 77) {
    return getCloudSVG();
  }
  if (weatherCode >= 85 && weatherCode <= 86) {
    return getCloudSVG();
  }
  return getSunSVG();
}
