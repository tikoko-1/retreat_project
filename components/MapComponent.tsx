"use client";

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  country?: string;
}

export default function MapComponent({
  latitude,
  longitude,
  address,
  city,
  country
}: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    mapRef.current = L.map(mapContainerRef.current).setView([latitude, longitude], 13);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current);

    // Add marker
    const marker = L.marker([latitude, longitude]).addTo(mapRef.current);

    // Add popup with location info
    const popupContent = `
      <div class="p-2">
        <div class="font-semibold text-gray-900">${address || `${city}, ${country}`}</div>
        <div class="text-sm text-gray-600">${latitude.toFixed(4)}, ${longitude.toFixed(4)}</div>
      </div>
    `;
    marker.bindPopup(popupContent);

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [latitude, longitude, address, city, country]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full relative z-0"
      style={{ height: '100%', minHeight: '300px' }}
    />
  );
}
