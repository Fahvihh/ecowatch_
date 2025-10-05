export type MeteomaticsData = any;

export async function fetchMeteomaticsData(lat: number, lng: number): Promise<MeteomaticsData | null> {
  try {
    // Faz o fetch da rota interna, que já chama a Meteomatics do lado do servidor
    const response = await fetch(`/api/meteomatics?lat=${lat}&lon=${lng}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar dados da API interna');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados da Meteomatics via API interna:', error);
    return null;
  }
}

