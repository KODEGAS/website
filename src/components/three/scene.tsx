"use client"
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Main Object (TorusKnot as Particles)
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.35, 200, 32);
    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xcc66ff, // Brighter purple
        size: 0.015,
        blending: THREE.AdditiveBlending,
        transparent: true,
        sizeAttenuation: true,
    });
    const torusKnotParticles = new THREE.Points(geometry, particlesMaterial);
    scene.add(torusKnotParticles);
    
    // Lights (Still useful for starfield and potential future solid objects)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x7DF9FF, 150, 100); // Accent color, increased intensity
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffffff, 50, 100); // Increased intensity
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // Particle System (Stars)
    const particlesCount = 500;
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
      opacity: 0.7,
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

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Keyboard rotation
      if (keyboardState['ArrowUp']) torusKnotParticles.rotation.x -= 0.01;
      if (keyboardState['ArrowDown']) torusKnotParticles.rotation.x += 0.01;
      if (keyboardState['ArrowLeft']) torusKnotParticles.rotation.y -= 0.01;
      if (keyboardState['ArrowRight']) torusKnotParticles.rotation.y += 0.01;

      // Animate Torus Knot Particles
      torusKnotParticles.rotation.x += 0.0005;
      torusKnotParticles.rotation.y += 0.001;
      
      // Add a subtle pulsing effect to the particles
      const scale = Math.sin(elapsedTime * 0.5) * 0.1 + 1;
      particlesMaterial.size = 0.015 * scale;

      // Animate Stars
      starfield.rotation.y = elapsedTime * 0.05;

      // Update camera based on mouse
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particlesMaterial.dispose();
      particlesGeometry.dispose();
      starfieldMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
