"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Globe?: any;
  }
}

export type Region = {
  lat: number;
  lng: number;
  name: string;
  url: string;
};


export default function GlobeBrazil({ onRegionClick }: { onRegionClick?: (lat: number, lng: number, name: string) => void }) {
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (globeRef.current && typeof window !== "undefined" && window.Globe) {
      const globe = (window as any).Globe()
        .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
        .bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png")
        .showGraticules(true)
        .showAtmosphere(true)
        .backgroundColor("rgba(0,0,0,0)")
        .onGlobeClick((event: any) => {
          // event.lat, event.lng
          if (onRegionClick && event && typeof event.lat === "number" && typeof event.lng === "number") {
            onRegionClick(event.lat, event.lng, `Localização (${event.lat.toFixed(2)}, ${event.lng.toFixed(2)})`);
          }
        });

      globe(globeRef.current);
      globe.onGlobeReady(() => {
        globe.pointOfView({ lat: -14.2350, lng: -51.9253, altitude: 3.0 }, 0);
      });
    }
  }, [onRegionClick]);

  return <div id="globeViz" ref={globeRef}  />;
}
