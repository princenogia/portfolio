"use client";
import { useRef, useMemo, MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform float uScroll;
uniform vec3 uColor;
uniform float uTheme; // 0 = Light, 1 = Dark
varying vec2 vUv;

// Simplex Noise (simplified)
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  // Animated noise coordinates
  vec2 noiseCoord = vUv * 6.0 + vec2(0.0, uTime * 0.05 + uScroll * 0.001);
  float noise = snoise(noiseCoord);
  
  // Contour lines: use fract of noise value
  // Multiply noise to get more lines
  float lines = smoothstep(0.9, 0.95, sin(noise * 20.0));
  
  // Color logic
  vec3 bgColor = mix(vec3(0.95, 0.95, 0.95), vec3(0.05, 0.05, 0.05), uTheme);
  vec3 lineColor = mix(vec3(0.8, 0.8, 0.8), vec3(0.2, 0.2, 0.2), uTheme);
  
  // Combine
  vec3 finalColor = mix(bgColor, lineColor, lines);
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export default function Contour({
  theme = 0,
  scrollRef,
}: {
  theme?: number;
  scrollRef?: MutableRefObject<number>;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColor: { value: new THREE.Color("#CBF250") },
      uTheme: { value: theme },
    }),
    [theme],
  );

  // Update uniforms when props change
  useFrame((state) => {
    if (mesh.current) {
      const material = mesh.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      material.uniforms.uTheme.value = theme;
      if (scrollRef) {
        material.uniforms.uScroll.value = scrollRef.current;
      }
    }
  });

  return (
    <mesh ref={mesh} scale={[2, 2, 1]}>
      {" "}
      {/* Scale up to cover screen */}
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
