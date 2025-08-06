import React, { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ScrollSmoother } from "gsap/ScrollSmoother";
import LandingPage from "./LandingPage";

window.React = React;

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);
ScrollTrigger.normalizeScroll(true);

export default function LandingPageWrapper() {
  useEffect(() => {
    ScrollSmoother.create({
      smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: false, // looks for data-speed and data-lag attributes on elements
      smoothTouch: 0, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    });
  }, []);

  return <LandingPage />;
}
