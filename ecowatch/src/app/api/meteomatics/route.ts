// src/app/api/meteomatics/route.ts

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Latitude e longitude são obrigatórias." },
      { status: 400 }
    );
  }

  // Aqui você precisa colocar suas credenciais do Meteomatics
  const username = process.env.METEOMATICS_USER;
  const password = process.env.METEOMATICS_PASS;

  if (!username || !password) {
    return NextResponse.json(
      { error: "Credenciais do Meteomatics não configuradas." },
      { status: 500 }
    );
  }

  try {
    // Exemplo de parâmetros do Meteomatics
    const parameters =
      "t_2m:C,relative_humidity_2m:p,wind_speed_10m:ms,global_rad:W,m_precip_1h:mm";

    const date = new Date().toISOString().split("T")[0]; // data de hoje
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
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Erro ao buscar dados da Meteomatics:", error);
    return NextResponse.json(
      { error: "Falha ao buscar dados da Meteomatics." },
      { status: 500 }
    );
  }
}
