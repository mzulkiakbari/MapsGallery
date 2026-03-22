import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Photo } from "@/types";

export const downloadPhotosAsZip = async (photos: Photo[], zipName: string) => {
  const zip = new JSZip();
  const folder = zip.folder(zipName);

  if (!folder) return;

  const downloadPromises = photos.map(async (photo) => {
    try {
      const proxyUrl = `/api/download?url=${encodeURIComponent(photo.url)}`;
      const response = await fetch(proxyUrl);
      const blob = await response.blob();
      folder.file(`${photo.neighborhood.replace(/\s+/g, '-')}-${photo.id}.jpg`, blob);
    } catch (error) {
      console.error(`Failed to download image ${photo.url}`, error);
    }
  });

  await Promise.all(downloadPromises);
  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, `${zipName}.zip`);
};

export const downloadSinglePhoto = async (photo: Photo) => {
  try {
    const proxyUrl = `/api/download?url=${encodeURIComponent(photo.url)}`;
    const response = await fetch(proxyUrl);
    const blob = await response.blob();
    saveAs(blob, `${photo.neighborhood.replace(/\s+/g, '-')}-${photo.id}.jpg`);
  } catch (error) {
    console.error(`Failed to download image ${photo.url}`, error);
  }
};
