let citiesData = [];

async function loadCities() {
  try {
    const response = await fetch('./Data/cities.json');
    citiesData = await response.json();
    console.log('Cities loaded:', citiesData.length);
  } catch (error) {
    console.error('Error loading cities:', error);
  }
}

function searchCities(query) {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  const results = citiesData.filter(city => 
    city.name.toLowerCase().startsWith(normalizedQuery)
  ).slice(0, 10);
  
  return results;
}

function displaySearchResults(results, resultContainer) {
  const localBox = resultContainer.querySelector('.localBox');
  
  if (results.length === 0) {
    resultContainer.style.display = 'none';
    return;
  }
  
  localBox.innerHTML = '';
  
  results.forEach(city => {
    const cityDiv = document.createElement('div');
    cityDiv.innerHTML = `
      <span>${city.name}</span>
      <span>, ${city.country}</span>
    `;
    cityDiv.style.cursor = 'pointer';
    cityDiv.addEventListener('click', () => selectCity(city, resultContainer));
    localBox.appendChild(cityDiv);
  });
  
  resultContainer.style.display = 'block';
}

function selectCity(city, resultContainer) {
  resultContainer.style.display = 'none';
  
  const latitude = parseFloat(city.lat);
  const longitude = parseFloat(city.lng);
  
  const newUrl = `${window.location.pathname}?latitude=${latitude}&longitude=${longitude}`;
  window.location.href = newUrl;
}

function setupSearch(inputId, resultContainerId) {
  const input = document.getElementById(inputId);
  const resultContainer = document.querySelector(resultContainerId);
  
  if (!input || !resultContainer) return;
  
  input.addEventListener('input', (e) => {
    const query = e.target.value;
    
    if (query.length >= 2) {
      const results = searchCities(query);
      displaySearchResults(results, resultContainer);
    } else {
      resultContainer.style.display = 'none';
    }
  });
  
  input.addEventListener('focus', (e) => {
    if (e.target.value.length >= 2) {
      const results = searchCities(e.target.value);
      displaySearchResults(results, resultContainer);
    }
  });
  
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !resultContainer.contains(e.target)) {
      resultContainer.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadCities();
  
  setupSearch('searchInput1', '.searchResult1');
  setupSearch('searchInput2', '.searchResult2');
});
