"use client"
import { lazy, Suspense } from 'react';

// Lazy load the Three.js scene to avoid blocking initial render
const Scene = lazy(() => import('./scene'));

function SceneLoader() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-background/10 to-background/30 flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default function LazyScene() {
  return (
    <Suspense fallback={<SceneLoader />}>
      <Scene />
    </Suspense>
  );
}