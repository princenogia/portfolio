"use client";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// Mouse tracking
const mouse = new THREE.Vector2();

function SceneContent() {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;

    // SCROLL ANIMATION (Simple & Robust)
    // As we scroll [0, 1], camera or object moves
    const scrollY = window.scrollY;

    // Rotate object based on time + mouse
    const time = state.clock.getElapsedTime();

    // Mouse Interaction (Damped)
    const targetX = mouse.x * 0.5;
    const targetY = mouse.y * 0.5;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetY + time * 0.1,
      0.1,
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetX + time * 0.15,
      0.1,
    );

    // Light follows mouse for cool reflection
    if (lightRef.current) {
      lightRef.current.position.x = mouse.x * 5;
      lightRef.current.position.y = mouse.y * 5;
    }
  });

  return (
    <>
      <color attach="background" args={["#050505"]} />
      {/* Lighting Setup - High Contrast Premium */}
      <ambientLight intensity={0.5} />
      <directionalLight
        ref={lightRef}
        position={[5, 5, 5]}
        intensity={4}
        color="#ffffff"
      />
      <pointLight position={[-5, -5, -5]} intensity={2} color="#c0ff00" />{" "}
      {/* Violet Rim */}
      {/* Hero Object */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          position={[0, 0, 0]}
          scale={viewport.width < 5 ? 1.5 : 2}
        >
          <icosahedronGeometry args={[1, 0]} /> {/* Clean geometric form */}
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.1} // Shiny for "Colors" visibility
            metalness={0.8}
            envMapIntensity={1}
          />
        </mesh>
      </Float>
      <ContactShadows opacity={0.5} scale={10} blur={2.5} far={4} />
      <Environment preset="city" />
    </>
  );
}

export default function SplineBackground() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse -1 to 1
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <SceneContent />
      </Canvas>
    </div>
  );
}
