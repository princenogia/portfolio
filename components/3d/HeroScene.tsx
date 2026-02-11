"use client";
import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { USDZLoader } from "three/examples/jsm/loaders/USDZLoader";

function RoomModel() {
  const usdz = useLoader(USDZLoader, "/my-room/My_room.usdz");
  return <primitive object={usdz} scale={0.01} />;
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#c0ff00" wireframe />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Canvas
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <PerspectiveCamera makeDefault position={[18, 14, 18]} fov={50} />

        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 15, 5]} intensity={3.0} />
        <pointLight position={[-8, 8, -8]} intensity={2.5} color="#ff9966" />
        <pointLight position={[8, 5, 8]} intensity={2.0} color="#66ccff" />

        <Suspense fallback={<Loader />}>
          <RoomModel />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          target={[0, 2, 0]}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
