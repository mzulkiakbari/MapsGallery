"use client";

import React, { useState, useEffect } from "react";
import { useGallery } from "@/context/GalleryContext";
import { X, ChevronLeft, ChevronRight, Calendar, Download, Maximize2 } from "lucide-react";
import Image from "next/image";
import { formatDate, cn } from "@/utils/cn";
import { downloadSinglePhoto } from "@/utils/download";
import { AnimatePresence, motion } from "framer-motion";

export default function Lightbox() {
  const { selectedPhoto, setSelectedPhoto, filteredPhotos } = useGallery();
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    if (selectedPhoto) {
      const index = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
      setCurrentIndex(index);
    } else {
      setCurrentIndex(-1);
    }
  }, [selectedPhoto, filteredPhotos]);

  if (!selectedPhoto || currentIndex === -1) return null;

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
      >
        <button
          onClick={() => setSelectedPhoto(null)}
          className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors z-[110]"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Ghost Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-10 p-4 text-white/30 hover:text-white transition-colors ghost-arrow z-[110]"
        >
          <ChevronLeft className="w-12 h-12" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 md:right-10 p-4 text-white/30 hover:text-white transition-colors ghost-arrow z-[110]"
        >
          <ChevronRight className="w-12 h-12" />
        </button>

        <div className="relative w-full h-full max-w-6xl max-h-[85vh] flex flex-col gap-4">
          <div className="relative flex-1">
            <Image
              src={selectedPhoto.url.includes("maps.googleapis.com") ? `/api/image-proxy?url=${encodeURIComponent(selectedPhoto.url)}` : selectedPhoto.url}
              alt={selectedPhoto.address}
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="flex items-center justify-between text-white/90 px-4">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold">{selectedPhoto.neighborhood}</h3>
              <p className="text-sm text-white/60">{selectedPhoto.city}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">{formatDate(selectedPhoto.date)}</span>
              </div>
              <button 
                onClick={() => downloadSinglePhoto(selectedPhoto)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Download</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
