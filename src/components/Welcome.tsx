import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  CameraControls,
  MeshTransmissionMaterial,
  useGLTF,
  useFBX,
  SpotLight,
  useAnimations,
  VideoTexture,
  useVideoTexture,
} from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import {
  MeshBasicMaterial,
  MeshNormalMaterial,
  PerspectiveCamera,
  type SpotLight as SpotLightType,
  Vector3,
  type Group,
  type Object3DEventMap,
  Plane,
} from "three";

export default function App() {
  return (
    <Canvas shadows camera={{ fov: 20 }}>
      <Scene />

      <Perf position="top-left" style={{ transform: "scale(0.8)" }} />
    </Canvas>
  );
}

function Scene() {
  const ref = useRef<Group<Object3DEventMap> | null>(null);
  const { scene, meshes, animations, cameras } = useGLTF(
    "../models/hologram.glb"
  );

  const modelRef = useRef(scene);
  const screen = useRef(meshes["Spotlight_target_screen"]);
  console.log({ meshes, animations, cameras, scene });

  var camera = useRef<CameraControls>(null);

  const config = {
    meshPhysicalMaterial: false,
    transmissionSampler: false,
    backside: true,
    backsideThickness: -2.8,
    samples: 6,
    resolution: 1024,
    backsideResolution: 1024,
    transmission: 1,
    roughness: 0.1,
    ior: 1.23,
    thickness: 0.47,
    chromaticAberration: 0.19,
    anisotropy: 0.45,
    distortion: 0.0,
    distortionScale: 0.09,
    temporalDistortion: 0.65,
    attenuationDistance: 1.17,
    clearcoat: 0,
    attenuationColor: "#ffffff",
    color: "white",
  };
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.z -= delta;
    }
  });

  useThree((state) => {
    if (camera.current) {
      camera.current.setLookAt(0, 0, -9, 0, 0, -20);
      camera.current.zoomTo(0.4);
      camera.current.truck(0, -1);
      //camera.current.set(30, 0.75, 12);
      //camera.current.setOrbitPoint(0, 0, 0);
    }

    var light1 = scene.children.find((x) => x.name === "Wall_light_blue")!
      .children[0] as SpotLightType;
    light1.penumbra = 0.2;
    light1.intensity = 800;

    var light2 = scene.children.find((x) => x.name === "Wall_light_pink")!
      .children[0] as SpotLightType;
    light2.penumbra = 0.2;
    light2.intensity = 600;
    // meshes["Room"]!.material = new MeshBasicMaterial({ color: "#00ff00" });
  });

  const videoTexture = useVideoTexture("../videoplayback.mp4", {});

  return (
    <group>
      <primitive position={[2, 2, 0]} object={scene} />

      <primitive position={[2, 2, -92]} object={meshes["Plane"]!}>
        <meshPhongMaterial
          map={videoTexture}
          side={0}
          emissiveMap={videoTexture}
          emissive="#ffffff"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </primitive>
      <pointLight intensity={900} position={[0, -10, -70]} color="#2C67FF" />
      <SpotLight
        distance={65}
        color="#2C67FF"
        angle={2.5}
        position={[-16, 8, -15]}
        attenuation={20}
        anglePower={1.5}
        target={screen.current!}
      />
      <CameraControls ref={camera} makeDefault />
      {/* <SpotLight
        distance={65}
        color="#2C67FF"
        angle={2.5}
        position={[-15, 7, -15]}
        attenuation={20}
        anglePower={1.5}
        target={screen.current!}
      /> */}
      <group>
        <primitive position={[-4, 1, -20]} ref={ref} object={meshes["Logo"]!} />
      </group>
      <mesh position={[-4, 0, -20]}>
        <primitive
          position={[0, 0, 0]}
          ref={modelRef}
          object={meshes["Crystal_1"]!}
        >
          <MeshTransmissionMaterial {...config} toneMapped={true} />
        </primitive>

        <primitive
          position={[0, 0, 0]}
          ref={modelRef}
          object={meshes["Crystal_2"]!}
        ></primitive>
      </mesh>
    </group>
  );
}
