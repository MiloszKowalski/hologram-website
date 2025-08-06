import { useStore } from "@nanostores/react";
import type { CameraControls } from "@react-three/drei";
import { useCallback, useRef, type RefObject } from "react";
import { canRotateUsingPointer } from "../../store/animationStore";

export const useOrientationControls = (
  cameraRef: RefObject<CameraControls | null>
) => {
  const initialGammaRef = useRef<number>(null);
  const initialBetaRef = useRef<number>(null);
  const $canRotateUsingPointer = useStore(canRotateUsingPointer);

  const orientationHandler = useCallback(
    (event: DeviceOrientationEvent) => {
      if (
        !cameraRef.current ||
        !event.beta ||
        !event.gamma ||
        !$canRotateUsingPointer
      ) {
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
    },
    [$canRotateUsingPointer]
  );

  return orientationHandler;
};
