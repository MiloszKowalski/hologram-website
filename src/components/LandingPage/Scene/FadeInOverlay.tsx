import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { gsap } from "gsap";

export const FadeInOverlay = () => {
  const [opacityState, setOpacityState] = useState({ opacity: 1 });

  useGSAP(() => {
    gsap.to(opacityState, {
      opacity: 0,
      duration: 1,
      delay: 1,
      onUpdate: () => {
        setOpacityState({ opacity: opacityState.opacity });
      },
    });
  });

  return (
    <div
      className="w-full h-screen bg-black top-0 left-0 z-20 absolute pointer-events-none"
      style={{
        opacity: opacityState.opacity,
      }}
    />
  );
};
