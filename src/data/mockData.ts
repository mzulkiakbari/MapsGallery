import { Photo, Market } from "@/types";

export const MARKETS: Market[] = [
  { id: "jk", name: "Jakarta", lat: -6.2088, lng: 106.8456, zoom: 12 },
  { id: "sub", name: "Surabaya", lat: -7.2575, lng: 112.7521, zoom: 12 },
  { id: "bdg", name: "Bandung", lat: -6.9175, lng: 107.6191, zoom: 12 },
  { id: "mdn", name: "Medan", lat: 3.5952, lng: 98.6722, zoom: 12 },
];

export const SERVICES = ["Billboard", "LED", "Transit", "Street Furniture"];

const NEIGHBORHOODS: Record<string, string[]> = {
  Jakarta: ["Sudirman", "Kuningan", "Senayan", "Thamrin", "Menteng", "Kemang"],
  Surabaya: ["Tunjungan", "Darmo", "Gubeng", "Manyar", "Pakuwon"],
  Bandung: ["Dago", "Cihampelas", "Braga", "Lembang", "Pasteur"],
  Medan: ["Kesawan", "Petisah", "Polonia", "Belawan"],
};

// Deterministic random generator for hydration stability
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

const generatePhotos = (count: number): Photo[] => {
  const photos: Photo[] = [];
  
  // Real-world coordinates with specific headings to see actual advertising assets
  const REAL_LOCATIONS = [
    { city: "Jakarta", neighborhood: "Sudirman", lat: -6.21462, lng: 106.8188, heading: 15, service: "Billboard", pitch: 10 },
    { city: "Jakarta", neighborhood: "Thamrin", lat: -6.1948, lng: 106.8231, heading: 250, service: "LED", pitch: 20 },
    { city: "Jakarta", neighborhood: "Senayan", lat: -6.2274, lng: 106.8006, heading: 80, service: "LED", pitch: 15 },
    { city: "Jakarta", neighborhood: "Kuningan", lat: -6.2255, lng: 106.8324, heading: 120, service: "Street Furniture", pitch: 0 },
    { city: "Jakarta", neighborhood: "Menteng", lat: -6.1873, lng: 106.8335, heading: 45, service: "Transit", pitch: 0 },
    { city: "Surabaya", neighborhood: "Tunjungan", lat: -7.2625, lng: 112.7396, heading: 0, service: "Billboard", pitch: 10 },
    { city: "Surabaya", neighborhood: "Darmo", lat: -7.2845, lng: 112.7388, heading: 180, service: "LED", pitch: 15 },
    { city: "Bandung", neighborhood: "Dago", lat: -6.8906, lng: 107.6133, heading: 90, service: "Billboard", pitch: 5 },
    { city: "Bandung", neighborhood: "Braga", lat: -6.9175, lng: 107.6096, heading: 120, service: "Street Furniture", pitch: 0 },
    { city: "Medan", neighborhood: "Kesawan", lat: 3.5852, lng: 98.6722, heading: 45, service: "Transit", pitch: 0 },
  ];

  for (let i = 1; i <= count; i++) {
    const locIndex = i % REAL_LOCATIONS.length;
    const realLoc = REAL_LOCATIONS[locIndex];

    const city = realLoc.city;
    const service = realLoc.service;
    const neighborhood = realLoc.neighborhood;
    const isPortrait = seededRandom(i + 300) > 0.7;
    
    // Map Pins: Add micro-noise so pins spread out across the city
    const lat = realLoc.lat + (seededRandom(i + 400) - 0.5) * 0.05;
    const lng = realLoc.lng + (seededRandom(i + 500) - 0.5) * 0.05;

    // Camera: EXACT explicit coordinates so we don't accidentally look at a fence!
    const camLat = realLoc.lat;
    const camLng = realLoc.lng;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const heading = realLoc.heading;
    const pitch = realLoc.pitch;
    
    const url = apiKey 
      ? `https://maps.googleapis.com/maps/api/streetview?size=${isPortrait ? '800x1200' : '1200x800'}&location=${camLat},${camLng}&fov=80&heading=${heading}&pitch=${pitch}&key=${apiKey}`
      : `https://picsum.photos/seed/${i}/${isPortrait ? '800/1200' : '1200/800'}`;

    const thumbnailUrl = apiKey
      ? `https://maps.googleapis.com/maps/api/streetview?size=${isPortrait ? '200x300' : '300x200'}&location=${camLat},${camLng}&fov=80&heading=${heading}&pitch=${pitch}&key=${apiKey}`
      : `https://picsum.photos/seed/${i}/${isPortrait ? '200/300' : '300/200'}`;

    photos.push({
      id: `photo-${i}`,
      url,
      thumbnailUrl,
      city,
      service,
      lat,
      lng,
      date: new Date(2024, Math.floor(seededRandom(i + 600) * 12), Math.floor(seededRandom(i + 700) * 28) + 1).toISOString(),
      neighborhood,
      isPortrait,
      address: `${neighborhood} Street No. ${i}, ${city}`,
    });
  }
  return photos;
};

export const MOCK_PHOTOS = generatePhotos(120); // Reduced to 120 for extremely fast performance

