"use client"
import { lazy, Suspense } from 'react';

// Lazy load the About scene
const AboutScene = lazy(() => import('./about-scene'));

function AboutSceneLoader() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center rounded-lg">
      <div className="animate-pulse">
        <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default function LazyAboutScene() {
  return (
    <Suspense fallback={<AboutSceneLoader />}>
      <AboutScene />
    </Suspense>
  );
}