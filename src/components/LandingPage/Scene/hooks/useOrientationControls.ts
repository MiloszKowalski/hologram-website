import type { CameraControls } from "@react-three/drei";
import { useCallback, useRef, type RefObject } from "react";
import { canRotateUsingPointer } from "../../store/animationStore";
import throttle from "lodash.throttle";

export const useOrientationControls = (
  cameraRef: RefObject<CameraControls | null>
) => {
  const initialGammaRef = useRef<number>(null);
  const initialBetaRef = useRef<number>(null);

  const orientationHandler = useCallback(
    throttle((event: DeviceOrientationEvent) => {
      if (!canRotateUsingPointer.get()) {
        initialGammaRef.current = null;
        initialBetaRef.current = null;

        return;
      }

      if (!cameraRef.current || !event.beta || !event.gamma) {
        return;
      }

      if (!initialGammaRef.current) {
        initialGammaRef.current = event.gamma;
      }

      if (!initialBetaRef.current) {
        initialBetaRef.current = event.beta;
      }

      cameraRef.current.rotateTo(
        (event.gamma - initialGammaRef.current) / 100,
        Math.PI / 2.25 + (event.beta - initialBetaRef.current) / 100,
        true
      );
    }, 50),
    []
  );

  return orientationHandler;
};
