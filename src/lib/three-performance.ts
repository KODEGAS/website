/**
 * Three.js Performance Optimization Utilities
 * Provides device-based performance configurations and optimizations
 */

export interface DeviceCapability {
  tier: 'high' | 'medium' | 'low';
  particleCount: number;
  animationComplexity: number;
  pixelRatio: number;
  enableShadows: boolean;
  enablePostProcessing: boolean;
  antialias: boolean;
}

export interface PerformanceConfig {
  particles: {
    count: number;
    size: number;
  };
  quality: {
    pixelRatio: number;
    antialias: boolean;
  };
  features: {
    shadows: boolean;
    postProcessing: boolean;
    complexGeometry: boolean;
  };
}

/**
 * Detect device capability based on various factors
 */
export function detectDeviceCapability(): DeviceCapability {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) {
    return {
      tier: 'low',
      particleCount: 100,
      animationComplexity: 0.3,
      pixelRatio: 1,
      enableShadows: false,
      enablePostProcessing: false,
      antialias: false,
    };
  }

  // Get hardware info
  const renderer = gl.getParameter(gl.RENDERER) || '';
  const vendor = gl.getParameter(gl.VENDOR) || '';
  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 0;
  const maxVertexAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS) || 0;
  
  // Check for WebGL2 support
  const webgl2Support = !!document.createElement('canvas').getContext('webgl2');
  
  // Device memory (if supported)
  const deviceMemory = (navigator as any).deviceMemory || 4;
  
  // Screen resolution
  const screenArea = window.screen.width * window.screen.height;
  const isHighDPI = window.devicePixelRatio > 1.5;
  
  // User agent checks for mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isTablet = /iPad/i.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  // Performance scoring
  let score = 0;
  
  // Hardware scoring
  if (webgl2Support) score += 20;
  if (maxTextureSize >= 8192) score += 15;
  if (maxVertexAttribs >= 16) score += 10;
  if (deviceMemory >= 8) score += 15;
  if (deviceMemory >= 4) score += 10;
  
  // GPU scoring based on renderer string
  const highEndGPUs = [
    'nvidia', 'geforce', 'quadro', 'tesla',
    'radeon', 'rx ', 'vega', 'rdna',
    'intel iris', 'intel uhd 6', 'intel xe',
    'apple', 'm1', 'm2', 'm3'
  ];
  
  const lowEndIndicators = [
    'intel hd', 'intel uhd 4', 'intel uhd 5',
    'powervr', 'adreno 3', 'adreno 4', 'adreno 5',
    'mali-4', 'mali-t6', 'mali-t7'
  ];

  const rendererLower = renderer.toLowerCase();
  const vendorLower = vendor.toLowerCase();
  
  if (highEndGPUs.some(gpu => rendererLower.includes(gpu) || vendorLower.includes(gpu))) {
    score += 25;
  } else if (lowEndIndicators.some(gpu => rendererLower.includes(gpu))) {
    score -= 15;
  }
  
  // Screen and device scoring
  if (screenArea > 2073600) score += 10; // > 1920x1080
  if (isHighDPI) score += 5;
  if (isMobile) score -= 20;
  if (isTablet) score -= 10;
  
  // Connection speed consideration
  const connection = (navigator as any).connection;
  if (connection) {
    if (connection.effectiveType === '4g') score += 5;
    if (connection.effectiveType === '3g') score -= 5;
    if (connection.effectiveType === '2g') score -= 15;
  }

  // Determine tier based on score
  if (score >= 60) {
    return {
      tier: 'high',
      particleCount: 500,
      animationComplexity: 1.0,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
      enableShadows: true,
      enablePostProcessing: true,
      antialias: true,
    };
  } else if (score >= 30) {
    return {
      tier: 'medium',
      particleCount: 300,
      animationComplexity: 0.7,
      pixelRatio: Math.min(window.devicePixelRatio, 1.5),
      enableShadows: false,
      enablePostProcessing: false,
      antialias: true,
    };
  } else {
    return {
      tier: 'low',
      particleCount: 150,
      animationComplexity: 0.4,
      pixelRatio: 1,
      enableShadows: false,
      enablePostProcessing: false,
      antialias: false,
    };
  }
}

/**
 * Get optimized performance configuration based on device capability
 */
export function getPerformanceConfig(capability?: DeviceCapability): PerformanceConfig {
  const deviceCap = capability || detectDeviceCapability();
  
  return {
    particles: {
      count: deviceCap.particleCount,
      size: deviceCap.tier === 'high' ? 0.015 : deviceCap.tier === 'medium' ? 0.012 : 0.01,
    },
    quality: {
      pixelRatio: deviceCap.pixelRatio,
      antialias: deviceCap.antialias,
    },
    features: {
      shadows: deviceCap.enableShadows,
      postProcessing: deviceCap.enablePostProcessing,
      complexGeometry: deviceCap.tier !== 'low',
    },
  };
}

/**
 * Performance monitoring utilities
 */
export class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 60;
  private frameTimeHistory: number[] = [];
  private readonly maxHistoryLength = 60;

  updateFPS(): number {
    this.frameCount++;
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    
    this.frameTimeHistory.push(deltaTime);
    if (this.frameTimeHistory.length > this.maxHistoryLength) {
      this.frameTimeHistory.shift();
    }
    
    // Calculate average FPS over the last 60 frames
    if (this.frameCount % 10 === 0) {
      const avgFrameTime = this.frameTimeHistory.reduce((a, b) => a + b, 0) / this.frameTimeHistory.length;
      this.fps = Math.round(1000 / avgFrameTime);
    }
    
    this.lastTime = currentTime;
    return this.fps;
  }

  getCurrentFPS(): number {
    return this.fps;
  }

  isPerformancePoor(): boolean {
    return this.fps < 30;
  }

  shouldReduceQuality(): boolean {
    return this.fps < 45 && this.frameTimeHistory.length >= 30;
  }
}

/**
 * Memory management utilities for Three.js
 */
export function disposeThreeObject(obj: any): void {
  if (obj.geometry) {
    obj.geometry.dispose();
  }
  
  if (obj.material) {
    if (Array.isArray(obj.material)) {
      obj.material.forEach((material: any) => {
        disposeMaterial(material);
      });
    } else {
      disposeMaterial(obj.material);
    }
  }
  
  if (obj.texture) {
    obj.texture.dispose();
  }
  
  if (obj.children) {
    obj.children.forEach((child: any) => {
      disposeThreeObject(child);
    });
  }
}

function disposeMaterial(material: any): void {
  material.dispose();
  
  // Dispose textures
  Object.keys(material).forEach(prop => {
    const value = material[prop];
    if (value && typeof value === 'object' && value.dispose && typeof value.dispose === 'function') {
      value.dispose();
    }
  });
}

/**
 * Adaptive quality controller
 */
export class AdaptiveQuality {
  private performanceMonitor = new PerformanceMonitor();
  private currentConfig: PerformanceConfig;
  private baseConfig: PerformanceConfig;
  private adjustmentLevel = 0;
  private readonly maxAdjustments = 3;

  constructor(baseConfig: PerformanceConfig) {
    this.baseConfig = { ...baseConfig };
    this.currentConfig = { ...baseConfig };
  }

  update(): PerformanceConfig {
    const fps = this.performanceMonitor.updateFPS();
    
    if (this.performanceMonitor.shouldReduceQuality() && this.adjustmentLevel < this.maxAdjustments) {
      this.reduceQuality();
    } else if (fps > 55 && this.adjustmentLevel > 0) {
      this.increaseQuality();
    }
    
    return this.currentConfig;
  }

  private reduceQuality(): void {
    this.adjustmentLevel++;
    
    // Reduce particle count
    this.currentConfig.particles.count = Math.max(
      50,
      Math.floor(this.currentConfig.particles.count * 0.7)
    );
    
    // Reduce pixel ratio
    this.currentConfig.quality.pixelRatio = Math.max(
      1,
      this.currentConfig.quality.pixelRatio * 0.8
    );
    
    // Disable features
    if (this.adjustmentLevel >= 2) {
      this.currentConfig.features.shadows = false;
      this.currentConfig.features.postProcessing = false;
    }
    
    if (this.adjustmentLevel >= 3) {
      this.currentConfig.quality.antialias = false;
      this.currentConfig.features.complexGeometry = false;
    }
  }

  private increaseQuality(): void {
    this.adjustmentLevel--;
    
    // Gradually restore quality
    const factor = 1 - (this.adjustmentLevel * 0.3);
    
    this.currentConfig.particles.count = Math.floor(this.baseConfig.particles.count * factor);
    this.currentConfig.quality.pixelRatio = this.baseConfig.quality.pixelRatio * factor;
    
    if (this.adjustmentLevel < 2) {
      this.currentConfig.features.shadows = this.baseConfig.features.shadows;
      this.currentConfig.features.postProcessing = this.baseConfig.features.postProcessing;
    }
    
    if (this.adjustmentLevel === 0) {
      this.currentConfig = { ...this.baseConfig };
    }
  }

  getCurrentConfig(): PerformanceConfig {
    return this.currentConfig;
  }
  
  getCurrentFPS(): number {
    return this.performanceMonitor.getCurrentFPS();
  }
}