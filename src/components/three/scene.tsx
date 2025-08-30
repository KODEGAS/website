"use client"
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  detectDeviceCapability, 
  getPerformanceConfig, 
  AdaptiveQuality,
  disposeThreeObject 
} from '@/lib/three-performance';

export default function Scene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const adaptiveQualityRef = useRef<AdaptiveQuality | null>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    torusKnotParticles: THREE.Points;
    starfield: THREE.Points;
    cleanup: () => void;
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    
    // Detect device capability and get optimized config
    const deviceCapability = detectDeviceCapability();
    const performanceConfig = getPerformanceConfig(deviceCapability);
    
    // Initialize adaptive quality controller
    adaptiveQualityRef.current = new AdaptiveQuality(performanceConfig);
    
    console.log(`Three.js Scene - Device Tier: ${deviceCapability.tier}, Particles: ${performanceConfig.particles.count}`);

    // Scene
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer with optimized settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: performanceConfig.quality.antialias, 
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(performanceConfig.quality.pixelRatio);
    
    // Enable shadows only for high-end devices
    if (performanceConfig.features.shadows) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    
    currentMount.appendChild(renderer.domElement);

    // Main Object (TorusKnot as Particles) with adaptive geometry
    const geometryDetail = performanceConfig.features.complexGeometry ? 200 : 100;
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.35, geometryDetail, 32);
    
    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xcc66ff, // Brighter purple
        size: performanceConfig.particles.size,
        blending: THREE.AdditiveBlending,
        transparent: true,
        sizeAttenuation: true,
    });
    const torusKnotParticles = new THREE.Points(geometry, particlesMaterial);
    scene.add(torusKnotParticles);
    
    // Lights (optimized based on device capability)
    const ambientLight = new THREE.AmbientLight(0xffffff, deviceCapability.tier === 'high' ? 1 : 0.8);
    scene.add(ambientLight);

    // Reduce light intensity for lower-end devices
    const lightIntensity = deviceCapability.tier === 'high' ? 150 : deviceCapability.tier === 'medium' ? 100 : 50;
    const pointLight = new THREE.PointLight(0x7DF9FF, lightIntensity, 100);
    pointLight.position.set(5, 5, 5);
    
    if (performanceConfig.features.shadows) {
      pointLight.castShadow = true;
      pointLight.shadow.mapSize.width = 1024;
      pointLight.shadow.mapSize.height = 1024;
    }
    
    scene.add(pointLight);

    // Second light only for medium+ devices
    if (deviceCapability.tier !== 'low') {
      const pointLight2 = new THREE.PointLight(0xffffff, lightIntensity * 0.3, 100);
      pointLight2.position.set(-5, -5, -5);
      scene.add(pointLight2);
    }

    // Particle System (Stars) - adaptive count
    const particlesCount = performanceConfig.particles.count;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const starfieldMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      transparent: true,
      opacity: deviceCapability.tier === 'low' ? 0.5 : 0.7,
    });
    const starfield = new THREE.Points(particlesGeometry, starfieldMaterial);
    scene.add(starfield);

    // Mouse tracking
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Keyboard tracking
    const keyboardState: { [key: string]: boolean } = {};
    const handleKeyDown = (event: KeyboardEvent) => {
      keyboardState[event.key] = true;
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      keyboardState[event.key] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Handle Resize
    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let frameCount = 0;

    // Animation loop with performance monitoring
    const animate = () => {
      requestAnimationFrame(animate);
      frameCount++;
      
      // Update adaptive quality every 60 frames (roughly 1 second at 60fps)
      if (frameCount % 60 === 0 && adaptiveQualityRef.current) {
        const updatedConfig = adaptiveQualityRef.current.update();
        
        // Apply quality changes if needed
        if (updatedConfig.particles.count !== particlesCount) {
          // Note: Particle count changes require recreating geometry
          // For now, we'll just log the change
          console.log(`Performance adjustment: FPS ${adaptiveQualityRef.current.getCurrentFPS()}`);
        }
      }
      
      const elapsedTime = clock.getElapsedTime();
      const animationSpeed = deviceCapability.animationComplexity;

      // Keyboard rotation (reduced for low-end devices)
      const rotationSpeed = animationSpeed * 0.01;
      if (keyboardState['ArrowUp']) torusKnotParticles.rotation.x -= rotationSpeed;
      if (keyboardState['ArrowDown']) torusKnotParticles.rotation.x += rotationSpeed;
      if (keyboardState['ArrowLeft']) torusKnotParticles.rotation.y -= rotationSpeed;
      if (keyboardState['ArrowRight']) torusKnotParticles.rotation.y += rotationSpeed;

      // Animate Torus Knot Particles (reduced animation for performance)
      torusKnotParticles.rotation.x += 0.0005 * animationSpeed;
      torusKnotParticles.rotation.y += 0.001 * animationSpeed;
      
      // Add a subtle pulsing effect to the particles (only for high-end devices)
      if (deviceCapability.tier === 'high') {
        const scale = Math.sin(elapsedTime * 0.5) * 0.1 + 1;
        particlesMaterial.size = performanceConfig.particles.size * scale;
      }

      // Animate Stars (reduced speed for lower-end devices)
      starfield.rotation.y = elapsedTime * 0.05 * animationSpeed;

      // Update camera based on mouse (reduced responsiveness for performance)
      const cameraSpeed = deviceCapability.tier === 'high' ? 0.02 : 0.01;
      camera.position.x += (mouse.x * 2 - camera.position.x) * cameraSpeed;
      camera.position.y += (mouse.y * 2 - camera.position.y) * cameraSpeed;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    // Store references for cleanup
    sceneRef.current = {
      scene,
      camera,
      renderer,
      torusKnotParticles,
      starfield,
      cleanup: () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        
        // Dispose of Three.js objects
        disposeThreeObject(torusKnotParticles);
        disposeThreeObject(starfield);
        scene.clear();
        renderer.dispose();
        
        if (currentMount && renderer.domElement.parentNode === currentMount) {
          currentMount.removeChild(renderer.domElement);
        }
      }
    };
    
    animate();

    // Cleanup
    return () => {
      if (sceneRef.current) {
        sceneRef.current.cleanup();
        sceneRef.current = null;
      }
      adaptiveQualityRef.current = null;
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
