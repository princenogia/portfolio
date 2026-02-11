"use client";
import { Canvas } from "@react-three/fiber";
import Contour from "./Contour";
import { MutableRefObject, Suspense } from "react";

export default function Scene({
  theme = 0,
  scrollRef,
}: {
  theme?: number;
  scrollRef?: MutableRefObject<number>;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    >
      {/* zIndex 0 so it's the background of the container, behind the image wrapper content */}
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Contour theme={theme} scrollRef={scrollRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
