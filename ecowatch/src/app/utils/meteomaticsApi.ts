export type MeteomaticsData = any;

export async function fetchMeteomaticsData(lat: number, lng: number): Promise<MeteomaticsData | null> {
  // Parâmetros para o agronegócio
  const dateStart = '2025-10-04T00:00:00Z';
  const dateEnd = '2025-10-07T00:00:00Z';
  const interval = 'PT1H';
  const parameters = [
    't_2m:C', // Temperatura do ar a 2m
    'absolute_humidity_2m:gm3', // Umidade absoluta a 2m
    'wind_speed_2m:ms', // Velocidade do vento a 2m
    'precip_1h:mm', // Precipitação por hora
    'global_rad:W', // Radiação global
    'drought_index:idx', // Índice de seca
  ].join(',');
  const url = `https://api.meteomatics.com/${dateStart}--${dateEnd}:${interval}/${parameters}/${lat},${lng}/json`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: 'Basic ' + btoa('jnior_jos:M4PGX0wo8751BiXXBxlo'),
      },
    });
    if (!response.ok) throw new Error('Erro na requisição Meteomatics');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados da Meteomatics:', error);
    return null;
  }
}
