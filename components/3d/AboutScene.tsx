"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  PerspectiveCamera,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

function UserIcon3D() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle floating rotation
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} scale={1.5}>
        {/* Head */}
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color="#c0ff00"
            metalness={0.8}
            roughness={0.2}
            emissive="#c0ff00"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Body/Shoulders - Rounded Cone-ish shape */}
        <mesh position={[0, -0.6, 0]}>
          <capsuleGeometry args={[0.7, 1, 4, 16]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Orbiting Ring (optional for "tech" feel) */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.6, 0.05, 16, 100]} />
          <meshStandardMaterial
            color="#c0ff00"
            emissive="#c0ff00"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function AboutScene() {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "400px" }}>
      <Canvas dpr={[1, 2]} gl={{ alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#c0ff00" />
        <spotLight
          position={[-10, 10, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#fff"
        />

        <UserIcon3D />

        <Environment preset="city" />
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
          far={4}
        />
      </Canvas>
    </div>
  );
}
