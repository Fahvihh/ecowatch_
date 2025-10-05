"use client";
"use client";
// Para usar o gráfico, instale: npm install echarts echarts-for-react
import React from "react";
const ClimateChart = React.lazy(() => import("./ClimateChart"));

interface ClimateModalProps {
  open: boolean;
  onClose: () => void;
  lat: number;
  lng: number;
  regionName: string;
  meteoData: any;
}

export default function ClimateModal({ open, onClose, lat, lng, regionName, meteoData }: ClimateModalProps) {
  if (!open) return null;

  // Função para extrair nome e unidade do parâmetro
  function parseParameter(param: string) {
    // Exemplo: "t_2m:C" => { name: "Temperatura 2m", unit: "°C" }
    const [name, unit] = param.split(":");
    let displayName = name;
    if (name === "t_2m") displayName = "Temperatura 2m";
    else if (name === "absolute_humidity_2m") displayName = "Umidade Absoluta 2m";
    else if (name === "wind_speed_2m") displayName = "Vento 2m";
    else if (name === "precip_1h") displayName = "Precipitação 1h";
    else if (name === "global_rad") displayName = "Radiação Global";
    else if (name === "drought_index") displayName = "Índice de Seca";
    else displayName = name;
    return { displayName, unit };
  }

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.7)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#101c2c",
        borderRadius: 22,
        boxShadow: "0 0 48px #00ffe0",
        padding: 48,
        minWidth: 1200,
        maxWidth: 1600,
        color: "#eafcff",
        position: "relative",
        maxHeight: "95vh",
        overflowY: "auto"
      }}>
        <button onClick={onClose} style={{
          position: "absolute",
          top: 16,
          right: 16,
          background: "#00ffe0",
          color: "#101c2c",
          border: "none",
          borderRadius: 8,
          padding: "6px 14px",
          fontWeight: 700,
          cursor: "pointer"
        }}>Fechar</button>
        <h2 style={{fontSize: "1.7em", color: "#2fffd6", marginBottom: 12}}>{regionName}</h2>
        <div style={{marginBottom: 18}}>
          <iframe
            width="100%"
            height="350"
            style={{borderRadius: 16, border: "2px solid #00ffe0"}}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${lat},${lng}&z=10&output=embed`}
          />
        </div>
        <div style={{marginBottom: 10, fontWeight: 600}}>Dados Climáticos:</div>
        {meteoData && meteoData.data && meteoData.data.length > 0 ? (
          <div style={{display: "flex", flexWrap: "wrap", gap: "32px", justifyContent: "center", marginTop: 24}}>
            {meteoData.data.map((paramObj: any, idx: number) => {
              const { displayName, unit } = parseParameter(paramObj.parameter);
              const dates = paramObj.coordinates[0]?.dates || [];
              return (
                <div key={paramObj.parameter} style={{flex: "1 1 400px", minWidth: 400, maxWidth: 500, background: "#14233a", borderRadius: 12, padding: 18, boxShadow: "0 0 12px #00ffe0", display: "flex", flexDirection: "column", alignItems: "stretch", height: 420}}>
                  <div style={{fontSize: "1.2em", color: "#2fffd6", marginBottom: 6, textAlign: "center"}}>{displayName} <span style={{color: "#eafcff", fontSize: "0.9em"}}>({unit})</span></div>
                  <div style={{flex: 1, display: "flex"}}>
                    <React.Suspense fallback={<div>Carregando gráfico...</div>}>
                      <ClimateChart dates={dates} title={displayName} unit={unit} style={{height: "100%", width: "100%"}} />
                    </React.Suspense>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{color: '#ff4f4f'}}>Dados não disponíveis no momento.</div>
        )}
      </div>
    </div>
  );
}
