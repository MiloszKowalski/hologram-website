import { Canvas } from "@react-three/fiber";
import {
  BakeShadows,
  PerformanceMonitor,
  Preload,
  useGLTF,
} from "@react-three/drei";
import { SRGBColorSpace, ACESFilmicToneMapping } from "three";
import Scene from "./Scene";
import { Suspense, useEffect } from "react";
import { isMobile } from "react-device-detect";
//import { Perf } from "r3f-perf";
import { currentDpr, isSceneInView } from "../store/animationStore";
import { useStore } from "@nanostores/react";

export const ThreeCanvas = () => {
  const gltf = useGLTF("../models/hologram.glb");

  const $currentDpr = useStore(currentDpr);
  const $isSceneInView = useStore(isSceneInView);

  return (
    <Suspense
      fallback={
        <div className="text-white w-full h-svh flex items-center justify-center">
          Ładowanie...
        </div>
      }
    >
      <Canvas
        frameloop={$isSceneInView ? "demand" : "never"}
        style={{
          pointerEvents: isMobile ? "none" : "auto",
        }}
        dpr={$currentDpr}
        camera={{ fov: isMobile ? 18 : 20, far: 1000 }}
        gl={{
          autoClear: true,

          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 1,
          outputColorSpace: SRGBColorSpace,
          powerPreference: "high-performance",
          transmissionResolutionScale: 0.25,
        }}
      >
        <PerformanceMonitor bounds={(ref) => [45, 60]}>
          <Scene inView={$isSceneInView} gltf={gltf} />
          {/* <AdaptiveDpr pixelated /> */}
          <Preload all />
          <BakeShadows />
          {/* <Perf /> */}
        </PerformanceMonitor>
      </Canvas>
    </Suspense>
  );
};
