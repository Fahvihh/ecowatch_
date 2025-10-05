// Inicializa o globo
const globe = Globe()
  .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
  .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
  .showGraticules(true)
  .showAtmosphere(true)
  .backgroundColor('rgba(0,0,0,0)'); // sem fundo

// Regiões do Brasil
const regions = [
  { lat: -3.119, lng: -60.212, name: 'Manaus', url: 'regions/manaus.html' },
  { lat: -1.455, lng: -48.490, name: 'Belém', url: 'regions/belem.html' },
  { lat: -15.780, lng: -47.929, name: 'Brasília', url: 'regions/brasilia.html' },
  { lat: -23.550, lng: -46.633, name: 'São Paulo', url: 'regions/saopaulo.html' },
  { lat: -8.047, lng: -34.877, name: 'Recife', url: 'regions/recife.html' },
  { lat: -9.387, lng: -40.502, name: 'Petrolina', url: 'regions/petrolina.html' },
  { lat: -15.601, lng: -56.097, name: 'Cuiabá', url: 'regions/cuiaba.html' }
];

// Adiciona marcadores
globe
  .pointsData(regions)
  .pointLat('lat')
  .pointLng('lng')
  .pointLabel('name')
  .pointAltitude(0.01)
  .pointColor(() => 'red')
  .pointRadius(0.5)
  .onPointClick(pt => window.location.href = pt.url);

// Renderiza o globo
globe(document.getElementById('globeViz'));

// Centraliza no Brasil com zoom maior
globe.onGlobeReady(() => {
  globe.pointOfView(
    { lat: -14.2350, lng: -51.9253, altitude: 1.2 }, // altitude menor = zoom maior 
0);
});

// Efeito hover nos gráficos e valores
document.querySelectorAll('.chart-block, .value-box').forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.transform = 'scale(1.03)';
    el.style.transition = 'all 0.3s';
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'scale(1)';
  });
});

// app.js
fetch('https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=T2M,PRECTOT&community=RE&longitude=-60.02&latitude=-3.1&start=2023&end=2024&format=JSON')
  .then(response => response.json())
  .then(data => {
    const parametros = data.properties.parameter;
    console.log(parametros);

    // Aqui dá pra usar os dados em um gráfico, ou mostrar na tela
    document.getElementById('dadosManaus').innerText = `
      🌡️ Temperatura média anual: ${parametros.T2M['2024'][12]} °C
      🌧️ Precipitação: ${parametros.PRECTOT['2024'][12]} mm
    `;
  });
