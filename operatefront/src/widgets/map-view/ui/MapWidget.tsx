import React, { useEffect, useRef, useMemo, useState } from 'react';
import Map, { Source, Layer } from 'react-map-gl/mapbox';
import type { MapRef } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getInterpolatedState } from '../../../features/realtime-tracking/model/interpolationEngine';
import { toGeoJSON } from '../model/geojson.adapter';
import { metrics } from '../../../shared/lib/metrics';
import { useInfraStore } from '../../../entities/infra/store/infraStore';
import { toLineGeoJSON, toStationGeoJSON } from '../model/infra.adapter';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

// --- Professional SVG Iconography (Data URIs) ---
const SVG_METRO_UNDERGROUND = `data:image/svg+xml;base64,${btoa(`
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="20" stroke="white" stroke-width="4" fill="#0f172a" />
    <path d="M14 34V14L24 24L34 14V34" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`)}`;

const SVG_METRO_ELEVATED = `data:image/svg+xml;base64,${btoa(`
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="40" height="40" rx="8" stroke="white" stroke-width="4" fill="#0f172a" />
    <path d="M14 34V14L24 24L34 14V34" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`)}`;

const SVG_METRO_TRAIN = `data:image/svg+xml;base64,${btoa(`
  <svg width="64" height="128" viewBox="0 0 64 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 110C12 115.523 16.4772 120 22 120H42C47.5228 120 52 115.523 52 110V30C52 15 42 4 32 4C22 4 12 15 12 30V110Z" fill="white" stroke="#0f172a" stroke-width="2"/>
    <rect x="20" y="20" width="24" height="12" rx="2" fill="#0f172a" />
    <rect x="20" y="40" width="24" height="20" rx="2" fill="#0f172a" fill-opacity="0.2" />
    <rect x="20" y="70" width="24" height="20" rx="2" fill="#0f172a" fill-opacity="0.2" />
  </svg>
`)}`;

export const MapWidget: React.FC = () => {
  const mapRef = useRef<MapRef | null>(null);
  const rafRef = useRef<number | null>(null);
  const [iconsLoaded, setIconsLoaded] = useState(false);
  
  // 1. Manage Dynamic Infrastructure
  const { status, stations, segments, trains, fetchInfra, retry } = useInfraStore();

  useEffect(() => {
    fetchInfra();
  }, []);

  // 2. Pre-calculate Static GeoJSON
  const lineData = useMemo(() => toLineGeoJSON(segments), [segments]);
  const stationData = useMemo(() => toStationGeoJSON(stations), [stations]);

  // 3. Asset Loading & Map Initialization
  const onMapLoad = async () => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const loadIcon = (id: string, url: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          if (!map.hasImage(id)) {
            map.addImage(id, img);
          }
          resolve();
        };
        img.onerror = (err) => {
          console.error(`Error loading icon ${id}:`, err);
          resolve();
        };
        img.src = url;
      });
    };

    await Promise.all([
      loadIcon('st-underground', SVG_METRO_UNDERGROUND),
      loadIcon('st-elevated', SVG_METRO_ELEVATED),
      loadIcon('train-icon', SVG_METRO_TRAIN),
    ]);

    setIconsLoaded(true);
  };

  // 4. High-performance Real-time Engine
  useEffect(() => {
    const tick = () => {
      metrics.tickFps();
      
      const map = mapRef.current?.getMap();
      if (map && map.isStyleLoaded() && status === 'ready' && iconsLoaded) {
        const source = map.getSource('trains') as mapboxgl.GeoJSONSource;
        if (source) {
          const interpolatedState = getInterpolatedState();
          const geoJson = toGeoJSON(interpolatedState, trains);
          source.setData(geoJson as any); 
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [status, trains, iconsLoaded]);

  if (status === 'loading') {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-slate-950 text-slate-400">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-t-sky-500 border-slate-800" />
        <span className="animate-pulse font-mono tracking-widest text-sm uppercase">Synchronizing Systems...</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-slate-950 text-red-500">
        <span className="mb-2 font-bold uppercase">Critical Infrastructure Failure</span>
        <button onClick={retry} className="rounded border border-red-900 bg-red-950/30 px-4 py-2 hover:bg-red-900/50 transition-colors">
          Re-initialize Ingress
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Map
        ref={mapRef}
        onLoad={onMapLoad}
        initialViewState={{
          longitude: 106.74, 
          latitude: 10.82,
          zoom: 11.5,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactive={true}
      >
        {/* Infrastructure - Metro Route Path */}
        <Source id="metro-infra-path" type="geojson" data={lineData}>
          <Layer
            id="infra-line-layer"
            type="line"
            paint={{
              'line-color': '#0ea5e9',
              'line-width': 3,
              'line-opacity': 0.6,
              'line-dasharray': [2, 1] 
            }}
          />
        </Source>
        
        {/* Layer 2 & 3 only render after icons are ready to avoid Mapbox warnings */}
        {iconsLoaded && (
          <>
            {/* Stations (Symbol Layer) */}
            <Source id="metro-infra-stations" type="geojson" data={stationData}>
              <Layer
                id="infra-station-icons"
                type="symbol"
                layout={{
                  'icon-image': [
                    'match',
                    ['get', 'type'],
                    'underground', 'st-underground',
                    'elevated', 'st-elevated',
                    'st-underground' // Default fallback
                  ],
                  'icon-size': 0.6,
                  'icon-allow-overlap': true,
                  'text-field': ['get', 'name'],
                  'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                  'text-radial-offset': 1.8,
                  'text-size': 10,
                  'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold']
                }}
                paint={{
                  'text-color': '#f8fafc',
                  'text-halo-color': '#020617',
                  'text-halo-width': 1.5
                }}
              />
            </Source>

            {/* Trains (Symbol Layer) */}
            <Source id="trains" type="geojson" data={toGeoJSON({}, trains)}>
              <Layer
                id="trains-layer"
                type="symbol"
                layout={{
                  'icon-image': 'train-icon',
                  'icon-size': 0.35,
                  'icon-rotate': ['get', 'heading'],
                  'icon-rotation-alignment': 'map',
                  'icon-allow-overlap': true,
                  'text-field': ['concat', ['get', 'carCount'], ' TOA'],
                  'text-size': 9,
                  'text-offset': [0, 2.8],
                  'text-anchor': 'top',
                  'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold']
                }}
                paint={{
                  'text-color': '#f43f5e',
                  'text-halo-color': '#ffffff',
                  'text-halo-width': 1.5
                }}
              />
            </Source>
          </>
        )}
      </Map>
    </div>
  );
};
