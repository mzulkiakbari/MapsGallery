"use client";

import React from "react";
import { useGallery } from "@/context/GalleryContext";
import { MARKETS, SERVICES } from "@/data/mockData";
import { MapPin, Filter, Search, Download, ArrowUpDown } from "lucide-react";
import { cn } from "@/utils/cn";
import { downloadPhotosAsZip } from "@/utils/download";

export default function Header() {
  const {
    selectedCity, setSelectedCity,
    selectedService, setSelectedService,
    sortBy, setSortBy,
    filteredPhotos,
    setMapFocus
  } = useGallery();

  const handleCityChange = (city: string | null) => {
    setSelectedCity(city);
    if (city) {
      const market = MARKETS.find(m => m.name === city);
      if (market) {
        setMapFocus({ lat: market.lat, lng: market.lng }, market.zoom);
      }
    } else {
      setMapFocus({ lat: -2.5489, lng: 118.0149 }, 5);
    }
  };

  const handleDownloadAll = () => {
    const cityName = selectedCity || "All_Markets";
    downloadPhotosAsZip(filteredPhotos, `MapsGallery_${cityName}`);
  };

  return (
    <header className="h-20 border-b border-gray-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 sticky top-0 z-[60] shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <MapPin className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tighter uppercase italic">MapsGallery</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Campaign Monitor</p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-3">
        {/* City Filter */}
        <div className="relative group">
          <select
            value={selectedCity || ""}
            onChange={(e) => handleCityChange(e.target.value || null)}
            className="appearance-none bg-gray-50 dark:bg-zinc-900 px-6 py-2.5 pr-12 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer border border-gray-200 dark:border-zinc-800 hover:border-blue-500"
          >
            <option value="">All Markets</option>
            {MARKETS.map((market) => (
              <option key={market.id} value={market.name}>
                {market.name}
              </option>
            ))}
          </select>
          <Filter className="absolute right-4 top-3 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-blue-500 transition-colors" />
        </div>

        {/* Service Filter */}
        <div className="relative group">
          <select
            value={selectedService || ""}
            onChange={(e) => setSelectedService(e.target.value || null)}
            className="appearance-none bg-gray-50 dark:bg-zinc-900 px-6 py-2.5 pr-12 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer border border-gray-200 dark:border-zinc-800 hover:border-blue-500"
          >
            <option value="">All Services</option>
            {SERVICES.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <Search className="absolute right-4 top-3 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-blue-500 transition-colors" />
        </div>

        {/* Sort Filter (Only for single city or specific views) */}
        <div className="relative group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="appearance-none bg-gray-50 dark:bg-zinc-900 px-6 py-2.5 pr-12 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer border border-gray-200 dark:border-zinc-800 hover:border-blue-500 text-blue-600"
          >
            <option value="neighborhood">Neighborhood A-Z</option>
            <option value="date">Newest First</option>
          </select>
          <ArrowUpDown className="absolute right-4 top-3 w-4 h-4 text-blue-500 pointer-events-none" />
        </div>

        <button
          onClick={handleDownloadAll}
          disabled={filteredPhotos.length === 0}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white h-11 px-6 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-95 text-sm"
        >
          <Download className="w-4 h-4" />
          ZIP
        </button>
      </div>

      {/* Mobile Actions Overlay/Menu Toggle would go here or a simpler inline one */}
      <div className="md:hidden flex items-center gap-2">
        {selectedCity && (
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="appearance-none bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl text-xs font-bold text-blue-600 focus:outline-none border border-blue-200 dark:border-blue-800"
          >
            <option value="neighborhood">Sort: Neighborhood</option>
            <option value="date">Sort: Newest</option>
          </select>
        )}
        <button className="p-3 rounded-xl bg-gray-100 dark:bg-zinc-900">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </header>
  );
}
