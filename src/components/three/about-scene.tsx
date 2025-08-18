"use client"
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AboutScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mountRef.current || rendererRef.current) return;

    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const geometry = new THREE.IcosahedronGeometry(1.5, 0);
    const material = new THREE.MeshStandardMaterial({
        color: 0x7DF9FF,
        emissive: 0xcc66ff,
        emissiveIntensity: 0.3,
        metalness: 0.1,
        roughness: 0.2,
        wireframe: true,
        wireframeLinewidth: 2, 
    });
    const icosahedron = new THREE.Mesh(geometry, material);
    scene.add(icosahedron);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x800080, 50); // Primary color
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x7DF9FF, 50); // Accent color
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Euler();

    const handleMouseMove = (event: MouseEvent) => {
      if (!currentMount) return;
      const rect = currentMount.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      mouse.x = (x / currentMount.clientWidth) * 2 - 1;
      mouse.y = -(y / currentMount.clientHeight) * 2 + 1;

      targetRotation.y = mouse.x * 0.5;
      targetRotation.x = mouse.y * 0.5;
    };
    currentMount.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smoothly interpolate rotation
      icosahedron.rotation.x += (targetRotation.x - icosahedron.rotation.x) * 0.05;
      icosahedron.rotation.y += (targetRotation.y - icosahedron.rotation.y) * 0.05;
      
      // Constant slow rotation
      icosahedron.rotation.z += 0.002;

      // Pulse emissive intensity
      material.emissiveIntensity = Math.sin(elapsedTime * 2) * 0.15 + 0.25;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount) {
        currentMount.removeEventListener('mousemove', handleMouseMove);
        if (rendererRef.current) {
            currentMount.removeChild(rendererRef.current.domElement);
        }
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      rendererRef.current = null;
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full cursor-pointer" />;
}
