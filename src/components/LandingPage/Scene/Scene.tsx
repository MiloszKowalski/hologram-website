import { useGSAP } from "@gsap/react";
import {
  CameraControls,
  MeshTransmissionMaterial,
  SpotLight,
  useFBO,
  useGLTF,
  usePerformanceMonitor,
  useTexture,
  useVideoTexture,
  type PerformanceMonitorApi,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useCallback, useEffect, useRef, useState } from "react";
import { type Group, type Object3DEventMap } from "three";
import gsap from "gsap";
import { useNoScrollOnLoad } from "./hooks/useNoScrollOnLoad";
import { useWallLights } from "./hooks/useWallLights";
import { isMobile } from "react-device-detect";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@nanostores/react";
import {
  isIntroFinished,
  canRotateUsingPointer,
  isMenuVisible,
  showreelPosition,
} from "../store/animationStore";
import { useLevaConfig } from "./hooks/useLevaConfig";
import { useOrientationControls } from "./hooks/useOrientationControls";

export default function Scene() {
  const { scene, meshes } = useGLTF("../models/hologram.glb");
  useWallLights(scene);
  useNoScrollOnLoad();

  const crystalRef = useRef(scene);
  const logoRef = useRef<Group<Object3DEventMap> | null>(null);

  const $isIntroFinished = useStore(isIntroFinished);
  const $isMenuVisible = useStore(isMenuVisible);
  const $canRotateUsingPointer = useStore(canRotateUsingPointer);

  const [isDofEnabled, setIsDofEnabled] = useState(!isMobile);

  const timelineRef = useRef<gsap.core.Timeline>(null);
  const introCameraRotationRef = useRef({ x: -Math.PI / 2 });
  const screen = useRef(meshes["Spotlight_target_screen"]);
  const [cameraDolly, setCameraDolly] = useState({
    z: -5,
    y: 3,
    targetZ: -20,
    targetY: 0,
    focalLength: 0.15,
  });

  const levaConfig = useLevaConfig(isMobile);

  const [config, setConfig] = useState({
    ...levaConfig,
  });

  const cameraRef = useRef<CameraControls>(null);
  const orientation = useOrientationControls(cameraRef);

  useEffect(() => {
    if (cameraRef.current && introCameraRotationRef.current) {
      gsap.to(introCameraRotationRef.current, {
        x: 0,
        duration: 2,
        onComplete: () => {
          isIntroFinished.set(true);
          isMenuVisible.set(true);
        },
        ease: "power2.inOut",
        delay: 1,
      });
    }
  }, []);

  useGSAP(() => {
    if ($isMenuVisible) {
      gsap.fromTo(
        "#logo",
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power2.inOut",
        }
      );

      if (isMobile) {
        gsap.fromTo(
          "#hamburger",
          { y: -100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            delay: 0,
            duration: 0.75,
            ease: "power2.inOut",
          }
        );
      } else {
        gsap.fromTo(
          ".nav-link",
          { y: -100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.0,
            stagger: {
              // wrap advanced options in an object
              each: 0.05,
              grid: "auto",
              ease: "power2.inOut",
            },
          }
        );
      }
    } else {
      gsap.fromTo(
        "#logo",
        {
          y: 0,
          opacity: 1,
        },
        { y: -100, opacity: 0, duration: 0.25, ease: "power2.inOut" }
      );

      if (isMobile) {
        gsap.fromTo(
          "#hamburger",
          {
            y: 0,
            opacity: 1,
            delay: 0,
          },
          { y: -100, opacity: 0, duration: 0.25, ease: "power2.inOut" }
        );
      } else {
        gsap.fromTo(
          ".nav-link",
          {
            y: 0,
            opacity: 1,
          },
          {
            y: -100,
            opacity: 0,
            duration: 0.25,
          }
        );
      }
    }
  }, [$isMenuVisible]);

  useGSAP(() => {
    if (document.documentElement && $isIntroFinished) {
      document.documentElement.style.overflowY = "auto";

      timelineRef.current = gsap.timeline({
        invalidateOnRefresh: true,
        // yes, we can add it to an entire timeline!
        scrollTrigger: {
          invalidateOnRefresh: true,
          trigger: "#smooth-wrapper",
          pin: "#hero", // pin the trigger element while active
          start: "top top", // when the top of the trigger hits the top of the viewport
          end: "+=3500px", // end after scrolling 500px beyond the start
          onEnter: () => {
            window.scrollTo(0, 0);
            canRotateUsingPointer.set(true);
          },
          //markers: true,
          scrub: 0, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
          snap: {
            snapTo: "labelsDirectional", // snap to the closest label in the timeline
            inertia: true,
            duration: { min: 0.01, max: 0.75 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
            delay: 0, // wait 0.2 seconds from the last scroll event before doing the snapping
            ease: "linear", // the ease of the snap animation ("power3" by default)
          },
          onUpdate: (s) => {
            cameraRef.current?.setLookAt(
              0,
              cameraDolly.y,
              cameraDolly.z,
              0,
              cameraDolly.targetY,
              cameraDolly.targetZ,
              true
            );
          },
        },
      });

      if (isMobile) {
        timelineRef.current
          .to(cameraDolly, {
            ...cameraDolly,
            duration: 0.5,
          })
          .addLabel("start")
          .to(cameraDolly, {
            onStart: () => {
              canRotateUsingPointer.set(false);
            },
            onReverseComplete: () => canRotateUsingPointer.set(true),
            z: 105,
            y: 3,
            focalLength: 1,
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
          .to(cameraDolly, {
            z: 80,
            y: 3,
            focalLength: 1,
            targetY: -10,
            onStart: () => {
              const velocity =
                timelineRef.current?.scrollTrigger?.getVelocity();
              if (velocity && velocity > 250) {
                // timelineRef.current?.scrollTrigger?.scroll(
                //   timelineRef.current?.scrollTrigger.labelToScroll("finish")
                // );
              }
            },
            onComplete: () => {
              const velocity =
                timelineRef.current?.scrollTrigger?.getVelocity();
              if (velocity && velocity < 250) {
                // let scroll = {
                //   y: tl.scrollTrigger?.labelToScroll("scrollDamper") ?? 0,
                // };
                // setTimeout(() => {
                //   gsap
                //     .to(scroll, {
                //       y:
                //         (tl.scrollTrigger?.labelToScroll("scrollDamper") ?? 0) +
                //         500,
                //       duration: 2,
                //       onUpdate: () => {
                //         console.log(scroll.y);
                //         window.scrollTo(0, scroll.y);
                //       },
                //     })
                //     .play(0);
                // }, 5);
              }
            },
            targetZ: -85,
            duration: 5,
            delay: 0,
            ease: "power1.in",
          })
          .addLabel("scrollDamper");
      } else {
        timelineRef.current
          ?.to(cameraDolly, {
            ...cameraDolly,
            duration: 0.5,
          })
          .addLabel("start")
          .to(cameraDolly, {
            onStart: () => canRotateUsingPointer.set(false),
            onReverseComplete: () => canRotateUsingPointer.set(true),
            z: -15,
            y: 4,
            targetY: 0,
            targetZ: -85,
            focalLength: 1,
            duration: 10,
            ease: "sine.inOut",
          })
          .to(cameraDolly, {
            onStart: () => canRotateUsingPointer.set(false),
            onReverseComplete: () => canRotateUsingPointer.set(true),
            z: -30,
            y: -1,
            targetY: 0,
            targetZ: -85,
            focalLength: 1,
            duration: 8,
            ease: "sine.inOut",
          })
          .addLabel("finish")
          .to(cameraDolly, {
            z: -30,
            y: 0,
            targetY: 0,
            targetZ: -85,
            duration: 9,
          });
      }

      showreelPosition.set(
        timelineRef.current.scrollTrigger?.labelToScroll("finish") ?? 0
      );
    }
  }, [$isIntroFinished, document.documentElement]);

  const onIncline = useCallback((opt: PerformanceMonitorApi) => {
    // config.resolution = Math.min(config.resolution * 2, 4096);
    // config.backsideResolution = Math.min(config.backsideResolution * 2, 2048);
    // setConfig({ ...config, backside: true });
    // setIsDofEnabled(true);
  }, []);

  const onDecline = useCallback((opt: PerformanceMonitorApi) => {
    config.resolution = Math.max(config.resolution / 2, 256);
    config.backsideResolution = Math.max(config.backsideResolution / 2, 64);
    config.samples = Math.max(config.samples / 2, 2);
    setConfig({ ...config, backside: true });

    if (config.resolution === 256) {
      setIsDofEnabled(false);
    }
  }, []);

  const onFallback = useCallback((opt: PerformanceMonitorApi) => {}, []);

  const onChange = useCallback((opt: PerformanceMonitorApi) => {}, []);

  usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange });

  const videoTexture = useVideoTexture("../videoplayback.mp4", {});
  const bumpTexture = useTexture("bake_disp.png");
  bumpTexture.flipY = false;

  const buffer = useFBO({ colorSpace: "srgb" });

  useFrame((state) => {
    state.gl.autoClear = true;
    state.gl.setRenderTarget(buffer);
    state.gl.render(crystalRef.current, state.camera);
  });

  const invalidateTl = useCallback(() => {
    ScrollTrigger.normalizeScroll(false);

    timelineRef.current?.scrollTrigger?.refresh();
    timelineRef.current?.scrollTrigger?.scroller.scrollTo(0, 0);
    timelineRef.current?.scrollTrigger?.refresh();
    timelineRef.current?.invalidate();
    ScrollTrigger.normalizeScroll(true);
  }, [timelineRef.current?.scrollTrigger]);

  useGSAP(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", orientation, false);
    } else {
      console.log("DeviceOrientationEvent is not supported");
    }

    document.documentElement.addEventListener("fullscreenchange", () => {
      invalidateTl();
    });

    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", orientation, false);
      }

      document.documentElement.removeEventListener(
        "fullscreenchange",
        invalidateTl
      );
    };
  }, [$canRotateUsingPointer, invalidateTl]);

  useEffect(() => {
    if (cameraRef.current) {
      const { x, y, z } = crystalRef.current.position;
      cameraRef.current.setLookAt(0, y + 3, -5, x, y, z);
      cameraRef.current.zoomTo(0.4);
    }

    setTimeout(() => {
      setConfig({ ...config, backside: true });
    }, 250);
  }, []);

  useFrame((_state, delta) => {
    if (logoRef.current) {
      logoRef.current.rotation.z -= delta;
    }

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

      if (cameraRef.current && !isMobile) {
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
  });

  return (
    <group>
      <EffectComposer autoClear={true}>
        <Bloom opacity={1} />
        <Noise opacity={0.5} blendFunction={BlendFunction.COLOR_DODGE} />
        {isDofEnabled ? (
          <DepthOfField
            focusDistance={0}
            focalLength={cameraDolly.focalLength}
            bokehScale={14}
          />
        ) : (
          <></>
        )}
        <Vignette opacity={1} />
      </EffectComposer>
      <primitive position={[0, 0, 0]} object={scene} />
      <primitive position={[0, 0, -92]} object={meshes["Plane"]!}>
        <meshPhongMaterial
          map={videoTexture}
          side={0}
          emissiveMap={videoTexture}
          emissive="#ffffff"
          emissiveIntensity={0.75}
          toneMapped={false}
        />
      </primitive>
      <pointLight intensity={500} position={[0, -10, -70]} color="#2C67FF" />
      {!isMobile && (
        <SpotLight
          distance={65}
          color="#FFAFDF"
          angle={3.0}
          position={[-16, 8, -15]}
          attenuation={25}
          anglePower={6}
          opacity={0.1}
          target={screen.current!}
        />
      )}
      <CameraControls
        makeDefault
        azimuthRotateSpeed={0.01}
        ref={cameraRef}
        mouseButtons={{ left: 0, middle: 0, right: 0, wheel: 0 }}
      />

      <mesh ref={crystalRef} position={[0, 0, -20]}>
        <primitive
          position={[0, 0.925, 0]}
          ref={logoRef}
          object={meshes["Logo"]!}
        />
        <primitive position={[0, 0, 0]} object={meshes["Crystal002_1"]!}>
          <MeshTransmissionMaterial
            {...config}
            allowOverride
            forceSinglePass
            transmissionSampler={false}
            bumpMap={bumpTexture}
            bumpScale={15}
            toneMapped={true}
          />
        </primitive>
        <primitive position={[0, 0, 0]} object={meshes["Crystal002"]!} />
      </mesh>
    </group>
  );
}
