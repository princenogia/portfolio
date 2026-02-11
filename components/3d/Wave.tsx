"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
uniform float uTime;
varying vec2 vUv;
varying float vElevation;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Wavy effect
  float elevation = sin(pos.x * 3.0 + uTime * 0.5) * cos(pos.y * 2.5 + uTime * 0.2) * 0.5;
  // Add some irregularity
  elevation += sin(pos.x * 10.0 + uTime) * 0.05;
  
  pos.z += elevation;
  vElevation = elevation;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform vec3 uColor;
varying float vElevation;

void main() {
  // Mix color based on elevation for depth
  vec3 color = uColor;
  float strength = (vElevation + 0.4) * 1.5;
  
  // Fade out edges
  gl_FragColor = vec4(color, strength * 0.8);
}
`;

export default function Wave() {
  const mesh = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#CBF250") }, // Neon
    }),
    [],
  );

  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
        clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[10, 10, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={true}
        transparent={true}
      />
    </mesh>
  );
}
