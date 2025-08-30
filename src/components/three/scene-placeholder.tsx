"use client"

export default function ScenePlaceholder() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-cyan-400/5 to-purple-600/5 animate-pulse" />
      
      {/* Floating particles simulation */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Central loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Rotating rings */}
          <div className="w-32 h-32 border-2 border-purple-500/20 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-4 h-4 bg-purple-500 rounded-full" />
          </div>
          <div className="absolute top-2 left-2 w-28 h-28 border-2 border-cyan-400/20 rounded-full animate-spin animation-reverse">
            <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-400 rounded-full" />
          </div>
          
          {/* Loading text */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="text-sm text-purple-300/60 animate-pulse">Loading 3D Scene...</div>
          </div>
        </div>
      </div>
    </div>
  );
}