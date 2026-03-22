export interface Photo {
  id: string;
  url: string;
  thumbnailUrl: string;
  city: string;
  service: string;
  lat: number;
  lng: number;
  date: string;
  neighborhood: string;
  isPortrait: boolean;
  address: string;
}

export interface Market {
  id: string;
  name: string;
  lat: number;
  lng: number;
  zoom: number;
}
