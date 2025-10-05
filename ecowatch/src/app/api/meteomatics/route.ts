// src/app/api/meteomatics/route.ts

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return createCorsResponse(
      NextResponse.json({ error: "Latitude e longitude são obrigatórias." }, { status: 400 })
    );
  }

  const username = process.env.METEOMATICS_USER;
  const password = process.env.METEOMATICS_PASS;

  if (!username || !password) {
    return createCorsResponse(
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
    return createCorsResponse(NextResponse.json(data));
  } catch (error: any) {
    console.error("Erro ao buscar dados da Meteomatics:", error);
    return createCorsResponse(
      NextResponse.json({ error: "Falha ao buscar dados da Meteomatics." }, { status: 500 })
    );
  }
}

// Handler para requisição OPTIONS (pré-flight)
export async function OPTIONS() {
  return createCorsResponse(new Response(null, { status: 204 }));
}

// Função utilitária para aplicar os headers CORS
function createCorsResponse(response: Response | NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "https://ecowatch-iota.vercel.app");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}


