"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function RoomSetup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.1 + 0.5;
  });

  return (
    <group ref={groupRef} scale={[0.8, 0.8, 0.8]} position={[0, -0.5, 0]}>
      {/* Desk */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 0.1, 1.5]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Desk Legs */}
      <mesh position={[-1.3, -0.6, 0.5]}>
        <boxGeometry args={[0.1, 1.1, 0.1]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[1.3, -0.6, 0.5]}>
        <boxGeometry args={[0.1, 1.1, 0.1]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-1.3, -0.6, -0.5]}>
        <boxGeometry args={[0.1, 1.1, 0.1]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[1.3, -0.6, -0.5]}>
        <boxGeometry args={[0.1, 1.1, 0.1]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Monitor */}
      <group position={[0, 0.7, -0.3]}>
        <mesh>
          <boxGeometry args={[1.6, 1, 0.05]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.5, 0.9]} />
          <meshStandardMaterial
            color="#000"
            emissive="#c0ff00"
            emissiveIntensity={0.08}
          />
        </mesh>
        {/* Monitor Stand */}
        <mesh position={[0, -0.6, 0.2]}>
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh position={[0, -0.7, 0.2]}>
          <boxGeometry args={[0.5, 0.05, 0.3]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>

      {/* Keyboard */}
      <mesh position={[0, 0.1, 0.4]}>
        <boxGeometry args={[0.8, 0.03, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Chair */}
      <group position={[0, -0.3, 1.2]}>
        <mesh>
          <boxGeometry args={[0.6, 0.1, 0.6]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[0, 0.5, -0.25]}>
          <boxGeometry args={[0.6, 0.8, 0.1]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      </group>

      {/* Floating decorative elements */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[1.8, 1, 0]}>
          <icosahedronGeometry args={[0.15, 0]} />
          <meshStandardMaterial
            color="#c0ff00"
            wireframe
            emissive="#c0ff00"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={1} floatIntensity={0.5}>
        <mesh position={[-1.8, 0.8, 0.5]}>
          <octahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function ContactScene() {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "400px" }}>
      <Canvas camera={{ position: [0, 1, 4], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-3, 2, 2]} intensity={2} color="#c0ff00" />
        <RoomSetup />
      </Canvas>
    </div>
  );
}
