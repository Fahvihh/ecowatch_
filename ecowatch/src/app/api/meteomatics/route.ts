import { NextResponse } from "next/server";

const ALLOWED_ORIGIN = "https://ecowatchnasa.vercel.app";

function applyCorsHeaders(response: Response | NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

export async function OPTIONS() {
  const response = new Response(null, { status: 204 });
  return applyCorsHeaders(response);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return applyCorsHeaders(
      NextResponse.json({ error: "Latitude e longitude são obrigatórias." }, { status: 400 })
    );
  }

  const username = process.env.METEOMATICS_USER;
  const password = process.env.METEOMATICS_PASS;

  if (!username || !password) {
    return applyCorsHeaders(
      NextResponse.json({ error: "Credenciais do Meteomatics não configuradas." }, { status: 500 })
    );
  }

  try {
    const parameters =
      "t_2m:C,relative_humidity_2m:p,wind_speed_10m:ms,global_rad:W,m_precip_1h:mm";
    const date = new Date().toISOString().split("T")[0];
    const url = `https://api.meteomatics.com/${date}T00:00:00Z/${parameters}/${lat},${lon}/json`;

    const response = await fetch(url, {
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    return applyCorsHeaders(NextResponse.json(data));
  } catch (error: any) {
    console.error("Erro ao buscar dados da Meteomatics:", error);
    return applyCorsHeaders(
      NextResponse.json({ error: "Falha ao buscar dados da Meteomatics." }, { status: 500 })
    );
  }
}



