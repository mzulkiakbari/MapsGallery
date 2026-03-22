# MapsGallery

MapsGallery adalah aplikasi web interaktif yang dibangun menggunakan Next.js dan terintegrasi dengan Google Maps. Aplikasi ini menampilkan galeri gambar yang tersinkronisasi dengan titik lokasi (POI) di peta, termasuk dukungan Street View.

## 🚀 Fitur Utama
- **Integrasi Peta Interaktif**: Menampilkan titik navigasi dan POI menggunakan `@react-google-maps/api`.
- **Street View**: Terintegrasi dengan kustomisasi Google Street View di setiap lokasi.
- **Galeri Gambar Responsif**: Layout grid yang rapi dibantu oleh Tailwind CSS dan animasi transisi yang mulus dari Framer Motion.
- **Download Gambar/Data**: Fitur untuk mengunduh gambar dibantu oleh `file-saver` dan `jszip`.

## 🛠️ Teknologi yang Digunakan
- **[Next.js 14](https://nextjs.org/)** - Framework React untuk SSR/SSG.
- **[React 18](https://reactjs.org/)** - Library UI.
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework.
- **[@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api)** - Library integrasi Google Maps untuk React.
- **[Framer Motion](https://www.framer.com/motion/)** - Library untuk animasi komponen.
- **[Lucide React](https://lucide.dev/)** - Kumpulan icon minimalis.

## 📦 Instalasi & Cara Menjalankan (Lokal)

1. **Pastikan berada di direktori project**
   ```bash
   cd MapsGallery
   ```

2. **Install Semua Dependensi**
   ```bash
   npm install
   ```

3. **Atur Environment Variables**
   Project ini membutuhkan API key Google Maps, buat file `.env` dan konfigurasikan seperti ini:
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
   ```

4. **Jalankan Development Server**
   Project ini di-setting untuk berjalan pada port `3002`.
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3002](http://localhost:3002) di browser kamu untuk melihat hasilnya.

## 🚀 Build untuk Production

Untuk melihat hasil optimal (production-ready) dan mem-build Next.js app:

```bash
npm run build
npm run start
```

## 🌐 Deployment (Vercel)
Aplikasi Next.js ini sangat mudah untuk di-deploy ke Vercel:
1. Push kodenya ke GitHub.
2. Login ke [vercel.com](https://vercel.com) dan buat project baru dari repository GitHub.
3. Tambahkan environment variables seperti `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` di dashboard Vercel.
4. Klik **Deploy** dan selesai!
