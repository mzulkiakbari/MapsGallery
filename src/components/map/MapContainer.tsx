"use client";

import React, { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { useGallery } from "@/context/GalleryContext";
import { Photo } from "@/types";
import { cn } from "@/utils/cn";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function MapContainer() {
  console.log("DEBUG: MapContainer Render Started");
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script-new",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const { filteredPhotos, mapCenter, mapZoom, selectedPhoto, setSelectedPhoto, hoveredPhotoId } = useGallery();
  const [map, setMap] = useState<any>(null);
  const [bouncingMarkerId, setBouncingMarkerId] = useState<string | null>(null);

  React.useEffect(() => {
    if (selectedPhoto) {
      setBouncingMarkerId(selectedPhoto.id);
      const timer = setTimeout(() => {
        setBouncingMarkerId(null);
      }, 750); // Approximately one bounce
      return () => clearTimeout(timer);
    }
  }, [selectedPhoto]);

  const onLoad = useCallback(function callback(map: any) {
    console.log("DEBUG: Map Loaded Successfully");
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    console.log("DEBUG: Map Unmounted");
    setMap(null);
  }, []);

  const mapOptions = React.useMemo(() => ({
    scrollwheel: true,
    disableDefaultUI: false,
    zoomControl: true,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
  }), []);

  if (loadError) return (
    <div className="w-full h-full bg-red-50 dark:bg-red-900/10 flex items-center justify-center p-6 text-center">
      <div className="max-w-xs">
        <p className="text-red-600 dark:text-red-400 font-bold mb-2">Map Load Error</p>
        <p className="text-sm text-red-500 dark:text-red-300">
          Check your API key and Internet connection. Ensure the &apos;Maps JavaScript API&apos; is enabled.
        </p>
      </div>
    </div>
  );

  if (!isLoaded) return (
    <div className="w-full h-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-zinc-700">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <span className="text-sm font-medium text-slate-500 animate-pulse">Initializing Maps...</span>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-slate-200">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={mapZoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {filteredPhotos.map((photo) => {
          const isSelected = selectedPhoto?.id === photo.id;
          let animation = undefined;
          let icon: any = null;

          if (isSelected) {
            // Drop pin with single bounce
            if (bouncingMarkerId === photo.id && typeof window !== 'undefined' && window.google?.maps?.Animation) {
               animation = window.google.maps.Animation.BOUNCE;
            }
          } else {
            // Unselected custom POI dot matching screenshot with shadow
            icon = {
              url: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='32' viewBox='0 0 28 32'%3E%3Cdefs%3E%3Cfilter id='s' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeDropShadow dx='0' dy='2' stdDeviation='1.5' flood-opacity='0.3'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d='M14 2C7.373 2 2 7.373 2 14c0 8 12 16 12 16s12-8 12-16c0-6.627-5.373-12-12-12z' fill='white' filter='url(%23s)'/%3E%3Ccircle cx='14' cy='14' r='8' fill='%23EA4335'/%3E%3Ccircle cx='14' cy='14' r='3.5' fill='white'/%3E%3C/svg%3E",
              scaledSize: typeof window !== 'undefined' && window.google?.maps?.Size ? new window.google.maps.Size(28, 32) : undefined,
              anchor: typeof window !== 'undefined' && window.google?.maps?.Point ? new window.google.maps.Point(14, 32) : undefined,
            };
          }
          
          return (
            <MarkerF
              key={photo.id}
              position={{ lat: photo.lat, lng: photo.lng }}
              onClick={() => setSelectedPhoto(photo)}
              animation={animation}
              icon={icon}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
}
