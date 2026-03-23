# MapsGallery

MapsGallery is an interactive web application built using Next.js and integrated with Google Maps. This application displays an image gallery synchronized with Points of Interest (POI) on the map, including Street View support.

## 🚀 Key Features
- **Interactive Map Integration**: Displays navigation points and POIs using `@react-google-maps/api`.
- **Street View**: Integrated with customized Google Street View at each location.
- **Responsive Image Gallery**: Clean grid layout utilizing Tailwind CSS and smooth transition animations from Framer Motion.
- **Image/Data Download**: Feature to download images supported by `file-saver` and `jszip`.

## 🛠️ Technologies Used
- **[Next.js 14](https://nextjs.org/)** - React framework for SSR/SSG.
- **[React 18](https://reactjs.org/)** - UI library.
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework.
- **[@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api)** - Google Maps integration library for React.
- **[Framer Motion](https://www.framer.com/motion/)** - Library for component animations.
- **[Lucide React](https://lucide.dev/)** - Collection of minimalist icons.

## 📦 Installation & Running Locally

1. **Ensure you are in the project directory**
   ```bash
   cd MapsGallery
   ```

2. **Install All Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   This project requires a Google Maps API key. Create a `.env` file and configure it like this:
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
   ```

4. **Run the Development Server**
   This project is configured to run on port `3002`.
   ```bash
   npm run dev
   ```
   Open [http://localhost:3002](http://localhost:3002) in your browser to view the result.

## 🚀 Build for Production

To view the optimal result (production-ready) and build the Next.js app:

```bash
npm run build
npm run start
```

## 🌐 Deployment (Vercel)
This Next.js application is very easy to deploy to Vercel:
1. Push the code to GitHub.
2. Log in to [vercel.com](https://vercel.com) and create a new project from the GitHub repository.
3. Add environment variables such as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in the Vercel dashboard.
4. Click **Deploy** and you're done!
