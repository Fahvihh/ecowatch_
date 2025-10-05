export type NasaData = {
  T2M: Record<string, Record<string, number>>;
  PRECTOT: Record<string, Record<string, number>>;
};

export async function fetchNasaData(lat: number, lng: number): Promise<NasaData | null> {
  const url = `https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=T2M,PRECTOT&community=RE&longitude=${lng}&latitude=${lat}&start=2023&end=2024&format=JSON`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.properties.parameter as NasaData;
  } catch (error) {
    console.error("Erro ao buscar dados da NASA:", error);
    return null;
  }
}
