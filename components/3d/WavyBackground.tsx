"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

// 1. Simplex Noise Shader Function
const noiseGLSL = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i); // Avoid truncation effects in permutation
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
`;

// 2. Define the Shader Material
const WaveShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#1a1a1a"), // Dark background
    uColorEnd: new THREE.Color("#c0ff00"), // Neon Green to match theme
    uMouse: new THREE.Vector2(0, 0),
    uNoiseFreq: 1.5,
    uNoiseAmp: 0.2, // Amplitude of the z-displacement
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;
    uniform float uNoiseFreq;
    uniform float uNoiseAmp;
    uniform vec2 uMouse;

    ${noiseGLSL}

    void main() {
      vUv = uv;

      vec3 pos = position;
      
      // Calculate noise based on position and time
      float noiseVal = snoise(vec2(pos.x * uNoiseFreq + uTime * 0.2, pos.y * uNoiseFreq + uTime * 0.2));
      
      // Mouse interaction: distort based on distance to mouse
      // We map mouse from screen space [-1, 1] to world if possible, 
      // but for background mainly just use it as a localized "energy" source or just simple offset.
      // Here let's just make the waves move slightly faster or offset based on mouse.
      
      pos.z += noiseVal * uNoiseAmp;

      vWave = pos.z; // Pass height to fragment for coloring

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    varying vec2 vUv;
    varying float vWave;
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    uniform float uTime;

    void main() {
      // Create isolines or smooth gradients
      // Mix colors based on vWave height
      // Normalize vWave roughly [-uNoiseAmp, uNoiseAmp] -> [0, 1]
      
      float waveNorm = smoothstep(-0.2, 0.2, vWave);
      
      // Base color mix
      vec3 color = mix(uColorStart, uColorEnd, waveNorm);
      
      // Add "isoline" effect - glow lines
      // float lines = sin(vWave * 40.0 + uTime);
      // lines = smoothstep(0.95, 1.0, lines);
      // color += lines * 0.3; // Add lines on top

      gl_FragColor = vec4(color, 1.0);
    }
  `,
);

// Extend so it works as JSX <waveShaderMaterial />
extend({ WaveShaderMaterial });

// 3. The Scene Component
const WaveMesh = () => {
  const ref = useRef<any>();
  const { viewport, mouse } = useThree();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uTime = clock.getElapsedTime();
      // Smoothly interpolate mouse to target if needed, but direct mapping is fine for now
      // mouse is normalized -1 to 1.
      ref.current.uMouse = new THREE.Vector2(mouse.x, mouse.y);
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
      <planeGeometry
        args={[viewport.width * 1.5, viewport.height * 1.5, 64, 64]}
      />
      {/* @ts-ignore */}
      <waveShaderMaterial ref={ref} transparent side={THREE.DoubleSide} />
    </mesh>
  );
};

// 4. Main Export Component
const WavyBackground = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      <Canvas camera={{ position: [0, 4, 4], fov: 50 }}>
        {/* Simple lighting (optional if shader is unlit) */}
        <ambientLight intensity={0.5} />
        <WaveMesh />
      </Canvas>
    </div>
  );
};

export default WavyBackground;
