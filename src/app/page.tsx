"use client";

import Header from "@/components/common/Header";
import MapContainer from "@/components/map/MapContainer";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import LocationPanel from "@/components/location/LocationPanel";
import { useGallery } from "@/context/GalleryContext";

export default function Home() {
  const { selectedPhoto } = useGallery();

  return (
    <main className="relative min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-80px)] overflow-hidden">
        {/* Map Section */}
        <div className="w-full md:w-1/2 lg:w-3/5 h-[400px] md:h-[calc(100vh-80px)] relative overflow-hidden">
          <div className="absolute inset-0">
            <MapContainer />
          </div>
        </div>

        {/* Gallery/Panel Section */}
        <div className="w-full md:w-1/2 lg:w-2/5 flex-1 md:h-[calc(100vh-80px)] overflow-y-auto bg-gray-50 dark:bg-zinc-900 border-l border-gray-200 dark:border-zinc-800">
          {selectedPhoto ? <LocationPanel /> : <GalleryGrid />}
        </div>
      </div>

    </main>
  );
}
