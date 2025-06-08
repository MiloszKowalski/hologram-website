import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  CameraControls,
  MeshTransmissionMaterial,
  useGLTF,
} from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import type { Group, Object3DEventMap } from "three";

export default function App() {
  return (
    <Canvas shadows camera={{ position: [5, -2.5, -5], fov: 35 }}>
      <ambientLight intensity={0.75} />
      <Torus />
      <CameraControls makeDefault />
      <Environment
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr"
        background
      />
      <Perf position="top-left" style={{ transform: "scale(0.8)" }} />
    </Canvas>
  );
}

function Torus() {
  const ref = useRef<Group<Object3DEventMap> | null>(null);
  const { scene, animations, meshes } = useGLTF("../models/untitled.glb");

  const modelRef = useRef(scene);

  const config = useControls({
    meshPhysicalMaterial: false,
    transmissionSampler: false,
    backside: true,
    backsideThickness: { value: 2, min: -10, max: 10 },
    samples: { value: 10, min: 0, max: 32, step: 1 },
    resolution: { value: 2048, min: 256, max: 2048, step: 256 },
    backsideResolution: { value: 1024, min: 32, max: 2048, step: 256 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
    thickness: { value: 0.25, min: 0, max: 10, step: 0.01 },
    chromaticAberration: { value: 0.4, min: 0, max: 1 },
    anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.65, min: 0, max: 1, step: 0.01 },
    attenuationDistance: { value: 0.5, min: 0, max: 2.5, step: 0.01 },
    clearcoat: { value: 0, min: 0, max: 1 },
    attenuationColor: "#ffffff",
    color: "white",
  });
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta;
    }
  });
  return (
    <group>
      <group ref={ref}>
        <primitive
          position={[0, 1, 0]}
          ref={modelRef}
          object={meshes["Curve"]!}
        >
          <meshNormalMaterial />
        </primitive>
      </group>
      <mesh position={[0, 0, 0]}>
        <primitive position={[0, 0, 0]} ref={modelRef} object={meshes["Cube"]!}>
          {config.meshPhysicalMaterial ? (
            <meshPhysicalMaterial {...config} color={config.color} />
          ) : (
            <MeshTransmissionMaterial {...config} toneMapped={true} />
          )}
        </primitive>
      </mesh>
    </group>
  );
}
