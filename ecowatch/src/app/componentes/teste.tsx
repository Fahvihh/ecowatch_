import axios from "axios";

async function fetchPosts(): Promise<any> {
  const nasaApiKey = 'https://api.meteomatics.com/2025-10-04T00:00:00Z--2025-10-07T00:00:00Z:PT1H/t_2m:C/52.520551,13.461804/json';
  
  const response = await axios.get(nasaApiKey, {
    auth: {
      username: 'jnior_jos',
      password: 'M4PGX0wo8751BiXXBxlo'
    }
  });
  return response.data;
}

export default async function Teste() {
  const posts = await fetchPosts();
  const coordinates = posts.data[0].coordinates[0]; 
  const dates = coordinates.dates;
  console.log(dates);
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white/80 rounded-2xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-6 drop-shadow-lg">EcoWatch - Dados Meteomatics</h1>
        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 flex-1 text-center shadow">
            <span className="block text-lg font-semibold text-gray-700">Latitude</span>
            <span className="text-2xl font-bold text-blue-600">{coordinates.lat}</span>
          </div>
          <div className="bg-green-50 rounded-lg p-4 flex-1 text-center shadow">
            <span className="block text-lg font-semibold text-gray-700">Longitude</span>
            <span className="text-2xl font-bold text-green-600">{coordinates.lon}</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse rounded-lg shadow">
            <thead>
              <tr className="bg-green-200 text-green-900">
                <th className="px-4 py-2 text-left">Data</th>
                <th className="px-4 py-2 text-left">Temperatura (°C)</th>
              </tr>
            </thead>
            <tbody>
              {dates.map((item: any, index: number) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
                  <td className="px-4 py-2 font-mono text-gray-700">{item.date}</td>
                  <td className="px-4 py-2 font-bold text-green-700">{item.value} °C</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <footer className="mt-8 text-gray-500 text-sm text-center">
        Powered by Meteomatics & NASA | EcoWatch 2025
      </footer>
    </main>
  );
}