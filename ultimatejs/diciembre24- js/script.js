// capturamos los elementos del html
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchButton');
const resultDiv = document.getElementById('result');

function saveSearchToHistory(countryName) {
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

  if (!searchHistory.includes(countryName)) {
    searchHistory.push(countryName);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }
}

function displaySearchHistory() {
  const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  const historyDiv = document.getElementById('history');

  if (searchHistory.length === 0) {
    historyDiv.innerHTML = "<p>No hay búsquedas recientes.</p>";
    return;
  }

  historyDiv.innerHTML = "<h3>Búsquedas recientes:</h3>";
  historyDiv.innerHTML += '<ul>' +
    searchHistory.map(country => `<li>${country}</li>`).join("") +
    "</ul>";
}

document.addEventListener("DOMContentLoaded", displaySearchHistory);

let lastSavedCountry = '';
let typingTimeOut;

searchInput.addEventListener('input', async () => {
  const countryName = searchInput.value.trim();

  clearTimeout(typingTimeOut);

  if (!countryName) {
    resultDiv.innerHTML = '';
    return;
  }

  typingTimeOut = setTimeout(async () => {
    if (countryName.length <3) {
      resultDiv.innerHTML =  '<p style="color: gray;">Escribe al menos 3 letras...</p>';
      return;
    }

  resultDiv.innerHTML = 'Buscando...';

  try {
    const countryData = await fetchCountryData(countryName);
    displayCountryData(countryData);

    if (countryName.toLowerCase() !== lastSavedCountry.toLocaleLowerCase ()) {
    saveSearchToHistory(countryName);
    displaySearchHistory();
    lastSavedCountry = countryName;
    }

  } catch (error) {
    resultDiv.innerHTML = `<p style='color: red;'>${error.message}</p>`;
  }
  }, 500);
});

async function fetchCountryData(countryName) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);

  if (!response.ok) {
    throw new Error('Lo siento, no encuentro el país');
  }
  const data = await response.json();
  return data [0];
  } catch (error) {
    throw error;
  }
}

function displayCountryData(country) {
  resultDiv.innerHTML = `
      <h2>${country.name.common}</h2>
    <p><strong>Capital:</strong> ${country.capital[0]}</p>
    <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Idioma:</strong> ${Object.values(country.languages)[0]}</p>
    <img src="${country.flags.svg}" alt="Bandera de ${country.name.common}" width="200">
  `;
}
