import { useEffect, useState } from "react";
import { cn } from "clsx-for-tailwind";

export const FadeInOverlay = () => {
  const [opacityState, setOpacityState] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpacityState(true);
    }, 500);
  }, []);

  return (
    <div
      className={cn(
        "w-full h-screen transition-opacity duration-1000 opacity-100 bg-black top-0 left-0 z-20 absolute pointer-events-none",
        { ["opacity-0"]: opacityState }
      )}
    />
  );
};
