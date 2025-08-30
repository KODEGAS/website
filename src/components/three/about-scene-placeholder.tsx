"use client"

export default function AboutScenePlaceholder() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-900/10 via-blue-900/5 to-transparent relative overflow-hidden rounded-lg">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-cyan-400/10 to-purple-600/10 animate-pulse" />
      
      {/* Wireframe placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Rotating wireframe simulation */}
          <div className="w-32 h-32 border border-purple-400/30 rotate-45 animate-spin" style={{ animationDuration: '8s' }}>
            <div className="absolute inset-4 border border-cyan-400/20 rotate-45" />
            <div className="absolute inset-8 border border-purple-300/20 rotate-45" />
          </div>
          
          {/* Corner indicators */}
          <div className="absolute -top-2 -left-2 w-2 h-2 bg-purple-400/50 rounded-full animate-pulse" />
          <div className="absolute -top-2 -right-2 w-2 h-2 bg-cyan-400/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-400/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-cyan-400/50 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
          
          {/* Loading text */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="text-xs text-purple-300/60 animate-pulse">Loading 3D Wireframe...</div>
          </div>
        </div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>
    </div>
  );
}