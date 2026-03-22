"use client";

import React, { useRef } from "react";
import { useGallery } from "@/context/GalleryContext";
import { X, Map as MapIcon, Download, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { downloadSinglePhoto } from "@/utils/download";

export default function LocationPanel() {
  const { selectedPhoto, setSelectedPhoto } = useGallery();

  if (!selectedPhoto) return null;

  const handleDownload = () => {
    if (selectedPhoto) downloadSinglePhoto(selectedPhoto);
  };

  return (
    <div className="w-full min-h-full bg-white dark:bg-zinc-950 flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-zinc-800 shrink-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
           <button 
             onClick={() => setSelectedPhoto(null)}
             className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-full transition-colors group"
           >
             <ChevronLeft className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white" />
           </button>
           <span className="font-bold">Image Details</span>
        </div>
        <button 
          onClick={() => setSelectedPhoto(null)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Image Section */}
      <div className="relative w-full bg-black flex-shrink-0" style={{ height: '350px' }}>
         <Image 
           src={selectedPhoto.url.includes("maps.googleapis.com") ? `/api/image-proxy?url=${encodeURIComponent(selectedPhoto.url)}` : selectedPhoto.url} 
           alt={selectedPhoto.address}
           fill
           className="object-contain"
           priority
         />
      </div>

      {/* Details Section */}
      <div className="p-6 space-y-6 flex-1 bg-white dark:bg-zinc-950">
        <div className="space-y-1">
           <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">{selectedPhoto.service}</p>
           <h2 className="text-2xl font-black leading-tight tracking-tight">{selectedPhoto.neighborhood}</h2>
        </div>

        <div className="space-y-4">
           <div className="bg-gray-50 dark:bg-zinc-900/50 p-4 rounded-xl">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 pb-2 border-b border-gray-200 dark:border-zinc-800/50">Location</p>
              <div className="pt-2 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                <p className="text-sm font-medium leading-relaxed">{selectedPhoto.address}</p>
              </div>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-zinc-900/50 p-4 rounded-xl">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Market</p>
                <p className="font-bold">{selectedPhoto.city}</p>
              </div>
              <div className="bg-gray-50 dark:bg-zinc-900/50 p-4 rounded-xl">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Date</p>
                <p className="font-bold">{new Date(selectedPhoto.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
           </div>
        </div>
      </div>
      
      {/* Footer Actions */}
      <div className="p-6 border-t border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 shrink-0 flex gap-4 mt-auto">
        <button className="flex-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 h-12 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-sm">
          <MapIcon className="w-4 h-4" />
          Directions
        </button>
        <button 
          onClick={handleDownload}
          className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all shadow-sm"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
