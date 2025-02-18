
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  const carbonForm = document.getElementById('carbonForm');
  const resultadosDiv = document.getElementById('resultados');
  const errorContainer = document.getElementById('error-container');

  const showError = (message, error = null) => {
    if (errorContainer) {
      errorContainer.innerText = message;
      errorContainer.style.display = 'block';
    }
    console.log('Error capturado:', message, error);
  };

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al obtener los datos');
      return await response.json();
    } catch (error) {
      showError('Error al obtener los datos de la API.', error);
      return null;
    }
  };

  const validateInputs = (inputs) => {
    for (const { value, message } of inputs) {
      if (isNaN(value) || value <= 0) {
        alert(message);
        return false;
      }
    }
    return true;
  };

  const calculateEmissions = (data, inputs) => {
    const {
      transportType, transportDistance, inBoundtransportType,
      inBoundtransportDistance, accommodationType, nights,
      dietType, mealsPerDay, activityType, activityHours
    } = inputs;

    const transportEmissions = transportDistance * data.transport[transportType];
    const inBoundEmissions = inBoundtransportDistance * data.transport[inBoundtransportType];
    const activityEmissions = activityHours * data.activities[activityType];
    const totalEmissions = transportEmissions + inBoundEmissions + activityEmissions;

    const accommodationWater = nights * data.accommodation[accommodationType].water;
    const dietWater = mealsPerDay * data.diet[dietType] * nights;
    const totalWater = accommodationWater + dietWater;

    return { totalEmissions, totalWater, transportEmissions, inBoundEmissions, activityEmissions, accommodationWater, dietWater };
  };

  const generateRecommendations = ({ totalEmissions, totalWater, inBoundEmissions, activityEmissions, accommodationWater, dietWater }) => {
    let recommendations = '';

    if (inBoundEmissions > 500) {
      recommendations += `
        <li>
          El transporte en destino genera muchas emisiones.
          Considera alquilar bicicletas, caminar o utilizar transporte público.
          Descubre rutas amigables con el medio ambiente en esta
          <a href="https://es.greenpeace.org/es/que-puedes-hacer-tu/consumo/movilidad/" target="_blank" rel="noopener noreferrer">página de rutas verdes</a>.
        </li>`;
    }

    if (activityEmissions > 50) {
      recommendations += `
        <li>
          Las actividades generan muchas emisiones de CO2.
          Opta por actividades de ecoturismo que protejan el medio ambiente y apoyen a las comunidades locales.
          Aprende más en esta <a href="https://soyecoturista.com/es/" target="_blank" rel="noopener noreferrer">web de ecoturismo</a>.
        </li>`;
    }

    if (totalEmissions > 300) {
      recommendations += `
        <li>
          Las emisiones de transporte son elevadas.
          Considera utilizar medios de transporte más sostenibles, como trenes o autobuses.
          Consulta esta <a href="https://es.greenpeace.org/es/que-puedes-hacer-tu/consumo/movilidad/" target="_blank" rel="noopener noreferrer">guía de transporte sostenible</a> para más información.
        </li>`;
    }

    if (accommodationWater > 2000) {
      recommendations += `
        <li>
          El alojamiento consume mucha agua.
          Al elegir alojamientos sostenibles, como campings o casas rurales con prácticas eco-amigables, puedes reducir el impacto.
          Consulta esta <a href="https://soyecoturista.com/es/" target="_blank" rel="noopener noreferrer">herramienta para buscar alojamientos sostenibles</a>.
        </li>`;
    }

    if (dietWater > 4000) {
      recommendations += `
        <li>
          La alimentación tiene un impacto significativo en el consumo de agua.
          Considera opciones como reducir el consumo de carne y optar por alimentos de origen vegetal.
          Este <a href="https://www.waterfootprint.org/time-for-action/what-can-consumers-do/#cropvanimal" target="_blank" rel="noopener noreferrer">artículo sobre dietas sostenibles</a> puede ayudarte a planificar tus comidas.
        </li>`;
    }

    if (totalWater >= 5000) {
      recommendations += `
        <li>
          El consumo total de agua es elevado.
          Podrías reducirlo eligiendo una tipología de alojamiento menos intensivo en recursos hídricos, adoptando una dieta que tenga en cuenta la reducción del consumo de carnes y que priorice el consumo de productos de Km.0. Al mismo tiempo, opta por actividades más sostenibles.
          Aprende más sobre cómo reducir tu huella hídrica en este
          <a href="https://www.watercalculator.org/" target="_blank" rel="noopener noreferrer">enlace útil sobre la huella hídrica</a>.
        </li>`;
    }

    if (totalWater < 5000) {
      recommendations += `
        <li>
          El consumo total de agua es bajo.
          ¡Enhorabuena! Tu elección de alojamiento, dieta y actividades demuestra un compromiso con la sostenibilidad y el cuidado del medio ambiente. Seguir priorizando productos de Km.0, una dieta equilibrada y actividades responsables es un gran ejemplo de cómo reducir la huella hídrica.
          Descubre más formas de mantener un impacto positivo en este
          <a href="https://www.un.org/es/observances/water-day" target="_blank" rel="noopener noreferrer">enlace útil sobre la huella hídrica</a>.
        </li>`;
    }
    if (totalEmissions < 150) {
      recommendations += `
        <li>
          ¡Felicidades! Tu huella de carbono es baja.
          Priorizar una movilidad sostenible consciente y actividades responsables es un gran ejemplo de como reducir la huella de carbono.
          Descubre mas formas de mantener un impacto positivo en este
          <a href="https://www.transportes.gob.es/transporte-terrestre/que-es-movilidad-sostenible" target="_blank" rel="noopener noreferrer">enlace útil sobre movilidad sostenible.</a>.
        </li>`;
    }
    return recommendations;
  };

  const displayResults = (inputs, results, recommendations) => {
    const { totalEmissions, totalWater } = results;

    resultadosDiv.innerHTML = `
      <h3>Resultados del Cálculo</h3>
      <ul>
        <li><strong>Emisiones totales de CO2:</strong> ${totalEmissions.toFixed(2)} kg</li>
        <li><strong>Consumo total de agua:</strong> ${totalWater.toFixed(2)} litros</li>
      </ul>
      <h3>Recomendaciones</h3>
      <ul>${recommendations}</ul>
    `;
    resultadosDiv.style.display = 'block';
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      button.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });

  carbonForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const inputs = {
      transportType: document.getElementById('transportType').value,
      transportDistance: parseFloat(document.getElementById('transportDistance').value),
      inBoundtransportType: document.getElementById('inBoundtransportType').value,
      inBoundtransportDistance: parseFloat(document.getElementById('inBoundtransportDistance').value),
      accommodationType: document.getElementById('accommodationType').value,
      nights: parseInt(document.getElementById('nights').value),
      dietType: document.getElementById('dietType').value,
      mealsPerDay: parseInt(document.getElementById('mealsPerDay').value),
      activityType: document.getElementById('activityType').value,
      activityHours: parseFloat(document.getElementById('activityHours').value)
    };

    const valid = validateInputs([
      { value: inputs.transportDistance, message: 'Distancia de transporte inválida.' },
      { value: inputs.inBoundtransportDistance, message: 'Distancia de transporte en destino inválida.' },
      { value: inputs.nights, message: 'Número de noches inválido.' },
      { value: inputs.mealsPerDay, message: 'Número de comidas por día inválido.' },
      { value: inputs.activityHours, message: 'Horas de actividad inválidas.' }
    ]);

    if (!valid) return;

    const data = await fetchData('/api/data');
    if (!data) return;

    const results = calculateEmissions(data, inputs);
    const recommendations = generateRecommendations(results);

    displayResults(inputs, results, recommendations);
  });
});
