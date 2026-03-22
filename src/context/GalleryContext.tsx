"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { Photo } from "@/types";
import { MOCK_PHOTOS } from "@/data/mockData";

interface GalleryContextType {
  photos: Photo[];
  filteredPhotos: Photo[];
  selectedCity: string | null;
  selectedService: string | null;
  selectedPhoto: Photo | null;
  hoveredPhotoId: string | null;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
  viewMode: string;
  sortBy: "date" | "neighborhood";
  setSelectedCity: (city: string | null) => void;
  setSelectedService: (service: string | null) => void;
  setSelectedPhoto: (photo: Photo | null) => void;
  setHoveredPhotoId: (id: string | null) => void;
  setMapFocus: (center: { lat: number; lng: number }, zoom: number) => void;
  setViewMode: (mode: string) => void;
  setSortBy: (sort: "date" | "neighborhood") => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [hoveredPhotoId, setHoveredPhotoId] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: -2.5489, lng: 118.0149 }); // Central Indonesia
  const [mapZoom, setMapZoom] = useState(5);
  const [viewMode, setViewMode] = useState("multi-city-multi-service");
  const [sortBy, setSortBy] = useState<"date" | "neighborhood">("neighborhood");

  const filteredPhotos = useMemo(() => {
    let result = MOCK_PHOTOS.filter((photo) => {
      const cityMatch = !selectedCity || photo.city === selectedCity;
      const serviceMatch = !selectedService || photo.service === selectedService;
      return cityMatch && serviceMatch;
    });

    if (sortBy === "neighborhood") {
      result = [...result].sort((a, b) => a.neighborhood.localeCompare(b.neighborhood));
    } else {
      result = [...result].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return result;
  }, [selectedCity, selectedService, sortBy]);

  const setMapFocus = (center: { lat: number; lng: number }, zoom: number) => {
    setMapCenter(center);
    setMapZoom(zoom);
  };

  const handleSetSelectedPhoto = (photo: Photo | null) => {
    setSelectedPhoto(photo);
    if (photo) {
      // Automatically zoom into the map when a photo is clicked
      setMapFocus({ lat: photo.lat, lng: photo.lng }, 18);
    }
  };

  return (
    <GalleryContext.Provider
      value={{
        photos: MOCK_PHOTOS,
        filteredPhotos,
        selectedCity,
        selectedService,
        selectedPhoto,
        hoveredPhotoId,
        mapCenter,
        mapZoom,
        viewMode,
        sortBy,
        setSelectedCity,
        setSelectedService,
        setSelectedPhoto: handleSetSelectedPhoto,
        setHoveredPhotoId,
        setMapFocus,
        setViewMode,
        setSortBy,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
}
