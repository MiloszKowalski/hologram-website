import { useGSAP } from "@gsap/react";
import {
  CameraControls,
  MeshTransmissionMaterial,
  SpotLight,
  useDetectGPU,
  useGLTF,
  usePerformanceMonitor,
  useTexture,
  useVideoTexture,
  type PerformanceMonitorApi,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer as EffectComposerComp,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useCallback, useEffect, useRef, useMemo } from "react";
import { Group, type Object3DEventMap, type Mesh } from "three";
import gsap from "gsap";
import { useNoScrollOnLoad } from "./hooks/useNoScrollOnLoad";
import { useWallLights } from "./hooks/useWallLights";
import { isMobile } from "react-device-detect";
import { useStore } from "@nanostores/react";
import {
  isIntroFinished,
  canRotateUsingPointer,
  isMenuVisible,
  showreelPosition,
  isLoading,
  currentDpr,
} from "../store/animationStore";
import { useLevaConfig } from "./hooks/useLevaConfig";
import { useOrientationControls } from "./hooks/useOrientationControls";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";
import throttle from "lodash.throttle";

interface SceneProps {
  gltf: ReturnType<typeof useGLTF<string>>;
  inView: boolean;
}

export default function Scene({ gltf, inView }: SceneProps) {
  const { scene, meshes } = useMemo(() => gltf, [gltf]);
  useWallLights(scene);
  useNoScrollOnLoad();

  const crystalRef = useRef<Mesh>(null);
  const logoRef = useRef<Group<Object3DEventMap> | null>(null);
  const introAnimationRef = useRef<gsap.core.Tween>(null);

  const $isIntroFinished = useStore(isIntroFinished);
  const $canRotateUsingPointer = useStore(canRotateUsingPointer);

  const isDofEnabled = !isMobile;

  const timelineRef = useRef<gsap.core.Timeline>(null);
  const introCameraRotationRef = useRef({ x: -Math.PI / 2, y: 0 });

  const initialDolly = {
    z: -5,
    y: 3,
    targetZ: -20,
    targetY: 0,
  };

  const cameraDollyRef = useRef({ ...initialDolly });

  const levaConfig = useLevaConfig(isMobile);

  const config = levaConfig;

  const cameraRef = useRef<CameraControls>(null);
  const orientation = useOrientationControls(cameraRef);

  useGSAP(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", orientation, false);
    } else {
      console.log("DeviceOrientationEvent is not supported");
    }

    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", orientation, false);
      }
    };
  }, []);

  const welcomeScrollPositionRef = useRef(0);

  useGSAP(() => {
    if (cameraRef.current && introCameraRotationRef.current) {
      introAnimationRef.current ??= gsap.to(introCameraRotationRef.current, {
        x: 0,
        y: 2,
        duration: 2,
        onComplete: () => {
          isIntroFinished.set(true);
          isMenuVisible.set(true);
          canRotateUsingPointer.set(true);

          cameraRef.current!.elevate(2, true);

          welcomeScrollPositionRef.current =
            ScrollSmoother.get()?.offset("#welcome") ?? 0;
        },
        ease: "power2.inOut",
        delay: 1,
        paused: true,
      });

      if ($isIntroFinished) {
        introAnimationRef.current.timeScale(3);
      } else {
        isLoading.set(false);
        introAnimationRef.current.timeScale(1);
        introAnimationRef.current.restart(true);
      }
    }
  }, [$isIntroFinished]);

  const onTlUpdate: ScrollTrigger.Callback = useCallback(
    throttle((s: ScrollTrigger) => {
      if (!isIntroFinished.get()) {
        return;
      }

      if (s.progress <= 0.1) {
        if (!canRotateUsingPointer.get()) {
          canRotateUsingPointer.set(true);
        }
      } else {
        if (canRotateUsingPointer.get()) {
          canRotateUsingPointer.set(false);
        }
      }

      cameraRef.current?.setLookAt(
        0,
        cameraDollyRef.current.y,
        cameraDollyRef.current.z,
        0,
        cameraDollyRef.current.targetY,
        cameraDollyRef.current.targetZ,
        true
      );
    }, 100),
    []
  );

  useGSAP(() => {
    ScrollSmoother.get()?.scrollTo(0, false);
    timelineRef.current = gsap
      .timeline({
        invalidateOnRefresh: true,
        // yes, we can add it to an entire timeline!
        scrollTrigger: {
          invalidateOnRefresh: true,
          trigger: "#hero",
          pin: "#hero", // pin the trigger element while active
          start: "top top", // when the top of the trigger hits the top of the viewport
          end: "+=2500px", // end after scrolling 500px beyond the start
          //markers: true,
          scrub: 0, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
          snap: {
            snapTo: "labelsDirectional", // snap to the closest label in the timeline
            inertia: false,
            duration: { min: 0.01, max: 0.3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
            delay: 0, // wait 0.2 seconds from the last scroll event before doing the snapping
            ease: "linear", // the ease of the snap animation ("power3" by default)
          },
          onUpdate: onTlUpdate,
        },
      })
      .clear(true)
      .progress(0);
  }, []);

  useGSAP(() => {
    if (inView) {
      timelineRef.current?.pause();
    } else {
      timelineRef.current?.resume();
    }
  }, [inView]);

  const pointerTimeoutRef = useRef<NodeJS.Timeout>(null);

  useGSAP(() => {
    if ($isIntroFinished) {
      ScrollSmoother.get()!.paused(false);

      if (!timelineRef.current || !crystalRef.current) {
        return;
      }

      if (isMobile) {
        timelineRef.current
          .from(cameraDollyRef.current, {
            ...initialDolly,
          })
          .addLabel("start")
          .to(cameraDollyRef.current, {
            onStart: () => {
              if (pointerTimeoutRef.current) {
                clearTimeout(pointerTimeoutRef.current);
              }

              //canRotateUsingPointer.set(false);
            },
            // onReverseComplete: () => {
            //   if (pointerTimeoutRef.current) {
            //     clearTimeout(pointerTimeoutRef.current);
            //   }

            //   pointerTimeoutRef.current = setTimeout(() => {
            //     canRotateUsingPointer.set(true);
            //   }, 1000);
            // },
            z: 105,
            y: 3,
            targetY: 0,
            targetZ: -20,
            duration: 30,
            delay: 1,
            ease: "power3.in",
          })
          .to(
            crystalRef.current.position,
            {
              y: -50,
              duration: 8,
              delay: 1,
              ease: "power3.in",
            },
            "<"
          )
          .addLabel("finish")
          .to(cameraDollyRef.current, {
            z: 105,
            y: 10,
            targetY: 20,
            targetZ: 30,
            duration: 1,
            delay: 0,
            ease: "power1.in",
          })
          .addLabel("scrollDamper");
      } else {
        timelineRef.current
          ?.from(cameraDollyRef.current, {
            ...initialDolly,
          })
          .addLabel("start")
          .to(cameraDollyRef.current, {
            z: -15,
            y: 4,
            targetY: 0,
            targetZ: -85,
            onStart: () => {
              if (pointerTimeoutRef.current) {
                clearTimeout(pointerTimeoutRef.current);
              }

              //canRotateUsingPointer.set(false);
            },
            onReverseComplete: () => {
              if (pointerTimeoutRef.current) {
                clearTimeout(pointerTimeoutRef.current);
              }

              pointerTimeoutRef.current = setTimeout(() => {
                //canRotateUsingPointer.set(true);
              }, 1000);
            },
            duration: 10,
            ease: "sine.inOut",
          })
          .to(cameraDollyRef.current, {
            onStart: () => {
              //canRotateUsingPointer.set(false);
            },
            z: -30,
            y: 2,
            targetY: 0,
            targetZ: -85,
            duration: 8,
            ease: "sine.inOut",
          })
          .addLabel("finish")
          .to(cameraDollyRef.current, {
            onStart: () => {
              //canRotateUsingPointer.set(false);
            },
            z: -30,
            y: 0,
            targetY: 0,
            targetZ: -85,
            duration: 9,
          });
      }

      setTimeout(() => {
        ScrollSmoother.refresh();
        showreelPosition.set(
          timelineRef.current?.scrollTrigger?.labelToScroll("finish") ?? 0
        );
      });
    }
  }, [$isIntroFinished]);

  const onIncline = useCallback((opt: PerformanceMonitorApi) => {
    // const reduce = Math.min(1, opt.fps / 45);
    // const newDpr = reduce;
    // currentDpr.set(newDpr);
    // config.resolution = Math.min(config.resolution * 2, 4096);
    // config.backsideResolution = Math.min(config.backsideResolution * 2, 2048);
    // config.samples = Math.max(config.samples * 2, 32);
  }, []);

  const { setDpr, invalidate, get: getThreeState } = useThree((s) => s);

  const onDecline = useCallback((opt: PerformanceMonitorApi) => {
    // const minRes = isMobile ? 256 : 768;
    // const minBackRes = isMobile ? 16 : 64;
    // const minSamples = isMobile ? 2 : 3;
    // config.resolution = Math.max(config.resolution / 2, minRes);
    // config.backsideResolution = Math.max(
    //   config.backsideResolution / 2,
    //   minBackRes
    // );
    // config.samples = Math.max(config.samples / 2, minSamples);
    // crystalRef.current?.updateMatrix();
    const reduce = Math.min(1, opt.fps / 45);
    const newDpr = reduce;
    currentDpr.set(newDpr);
  }, []);

  usePerformanceMonitor({ onIncline, onDecline });

  const videoTexture = useVideoTexture(
    isMobile ? "../videoplayback_mobile.mp4" : "../videoplayback.mp4",
    {
      loop: true,
      start: true,
      onVideoFrame: () => invalidate(),
    }
  );
  const bumpTexture = useTexture(
    isMobile ? "bake_disp_mobile.png" : "bake_disp.png"
  );
  bumpTexture.flipY = false;

  useEffect(() => {
    if (cameraRef.current && crystalRef.current) {
      const { x, y, z } = crystalRef.current.position;
      cameraRef.current.setLookAt(0, 2, -5, x, y, z);
      cameraRef.current.zoomTo(0.4);
    }
  }, []);

  useFrame((_state, delta) => {
    if (logoRef.current) {
      logoRef.current.rotation.z -= delta;
    }
  });

  useFrame(
    throttle((_state) => {
      if (introCameraRotationRef.current.x !== 0) {
        cameraRef.current!.rotateTo(
          introCameraRotationRef.current.x,
          Math.PI / 2.25,
          false
        );
      } else if (!isMobile && $canRotateUsingPointer) {
        const { pointer } = _state;
        const x = pointer.x;
        const y = pointer.y;
        const dampingFactor = 6;
        const additionalVerticalDampingFactor = 2;

        if (cameraRef.current) {
          cameraRef.current.rotateTo(
            (x * Math.PI) / 2 / dampingFactor,
            Math.PI / 2 -
              ((Math.PI / 2) * (y + 0.6)) /
                dampingFactor /
                additionalVerticalDampingFactor,
            true
          );
        }
      }
    }),
    100
  );

  const gpu = useDetectGPU();

  return (
    <group>
      <EffectComposerComp autoClear={true} depthBuffer={true}>
        <Bloom opacity={1} />
        <Noise opacity={0.5} blendFunction={BlendFunction.COLOR_DODGE} />

        {isDofEnabled && !gpu.gpu?.toLowerCase().includes("intel") ? (
          <DepthOfField
            target={crystalRef.current?.position ?? [0, 0, 0]}
            focalLength={700}
            bokehScale={100}
          />
        ) : (
          <></>
        )}

        <Vignette opacity={1} />
      </EffectComposerComp>
      <primitive position={[0, 0, 0]} object={scene} />
      <primitive position={[0, 0, -92]} object={meshes["Plane"]!}>
        <meshPhongMaterial
          map={videoTexture}
          side={0}
          emissiveMap={videoTexture}
          emissive="#ffffff"
          emissiveIntensity={0.75}
          toneMapped={true}
        />
      </primitive>
      <pointLight intensity={500} position={[0, -10, -70]} color="#2C67FF" />
      {!isMobile && (
        <SpotLight
          distance={65}
          color="#FFAFDF"
          angle={3.0}
          position={[0, 0, 0]}
          attenuation={25}
          anglePower={6}
          opacity={0.1}
        />
      )}
      <CameraControls
        makeDefault
        azimuthRotateSpeed={0.01}
        ref={cameraRef}
        mouseButtons={{ left: 0, middle: 0, right: 0, wheel: 0 }}
      />
      <mesh ref={crystalRef} position={[0, -1.5, -20]}>
        <primitive
          position={[0, 0.925, 0]}
          ref={logoRef}
          object={meshes["Logo"]!}
        />
        <primitive position={[0, 0, 0]} object={meshes["Crystal002_1"]!}>
          <MeshTransmissionMaterial
            {...config}
            bumpMap={bumpTexture}
            bumpScale={15}
          />
        </primitive>
        <primitive position={[0, 0, 0]} object={meshes["Crystal002"]!} />
      </mesh>
    </group>
  );
}
