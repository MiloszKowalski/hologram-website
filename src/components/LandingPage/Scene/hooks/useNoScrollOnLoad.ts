import { useLayoutEffect } from "react";

export const useNoScrollOnLoad = () => {
  useLayoutEffect(() => {
    document.documentElement.style.overflowY = "hidden";
  }, []);
};
