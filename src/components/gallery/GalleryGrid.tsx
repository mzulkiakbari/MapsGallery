"use client";

import React from "react";
import Image from "next/image";
import { useGallery } from "@/context/GalleryContext";
import { useInView } from "react-intersection-observer";
import { cn } from "@/utils/cn";
import { Photo } from "@/types";

export default function GalleryGrid() {
  const { filteredPhotos, setSelectedPhoto } = useGallery();

  return (
    <div className="p-4 grid grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredPhotos.map((photo, index) => (
        <GalleryItem key={photo.id} photo={photo} index={index} onClick={() => setSelectedPhoto(photo)} />
      ))}
      {filteredPhotos.length === 0 && (
        <div className="col-span-full py-20 text-center text-gray-500">
          No photos found for this selection.
        </div>
      )}
    </div>
  );
}

function GalleryItem({ photo, index, onClick }: { photo: Photo; index: number; onClick: () => void }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  });

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={cn(
        "group relative aspect-[3/4] bg-gray-200 dark:bg-zinc-800 rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl",
        photo.isPortrait ? "row-span-2 aspect-[3/5]" : ""
      )}
    >
      {inView ? (
        <Image
          src={photo.thumbnailUrl.includes("maps.googleapis.com") ? `/api/image-proxy?url=${encodeURIComponent(photo.thumbnailUrl)}` : photo.thumbnailUrl}
          alt={photo.neighborhood}
          fill
          className="object-cover transition-opacity duration-500 opacity-0 data-[loaded=true]:opacity-100"
          onLoad={(img) => img.currentTarget.setAttribute("data-loaded", "true")}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          priority={index < 6}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
             <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <p className="text-white text-xs font-medium uppercase tracking-wider">{photo.service}</p>
        <p className="text-white text-sm font-bold truncate">{photo.neighborhood}</p>
      </div>
    </div>
  );
}
