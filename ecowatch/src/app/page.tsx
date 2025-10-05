

"use client";
import "./assets/css/styles.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { fetchNasaData, NasaData } from "./utils/nasaApi";
import { fetchMeteomaticsData, MeteomaticsData } from "./utils/meteomaticsApi";
import ClimateModal from "./components/ClimateModal";
const GlobeBrazil = dynamic(() => import("./components/GlobeBrazil"), { ssr: false });
export default function Home() {
  const [nasaData, setNasaData] = useState<NasaData | null>(null);
  const [meteoData, setMeteoData] = useState<MeteomaticsData | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>("Manaus");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLat, setModalLat] = useState(-3.119);
  const [modalLng, setModalLng] = useState(-60.212);

  useEffect(() => {
    fetchNasaData(-3.119, -60.212).then(setNasaData);
    fetchMeteomaticsData(-3.119, -60.212).then(setMeteoData);
  }, []);

  function handleRegionClick(lat: number, lng: number, name: string) {
    setSelectedRegion(name);
    setModalLat(lat);
    setModalLng(lng);
    setModalOpen(true);
    fetchMeteomaticsData(lat, lng).then(setMeteoData);
  }

  return (
    <div className="min-h-screen bg-cover bg-center" style={{backgroundColor: '#061826'}}>
      {/* Header Navigation */}
      <header style={{
        width: '100%',
        background: 'rgba(10,30,50,0.85)',
        borderBottom: '1.5px solid #2fffd6',
        boxShadow: '0 2px 16px #00ffe033',
        padding: '0.5em 0',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 2000
      }}>
        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '32px',
          fontSize: '1.15em',
          fontWeight: 500
        }}>
          <a href="/" style={{
            color: '#2fffd6',
            textDecoration: 'none',
            padding: '8px 18px',
            borderRadius: '8px',
            transition: 'background 0.2s',
            background: 'transparent'
          }}>Home</a>
          <a href="/quem-somos" style={{
            color: '#eafcff',
            textDecoration: 'none',
            padding: '8px 18px',
            borderRadius: '8px',
            transition: 'background 0.2s',
            background: 'transparent'
          }}>Quem Somos</a>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{marginTop: '80px'}}>
            <GlobeBrazil onRegionClick={handleRegionClick} />
            <ClimateModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              lat={modalLat}
              lng={modalLng}
              regionName={selectedRegion}
              meteoData={meteoData}
            />
      </main>
    </div>
  );
}
