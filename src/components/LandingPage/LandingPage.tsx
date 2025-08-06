import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { Leva } from "leva";
import { Perf } from "r3f-perf";
import { SRGBColorSpace, ACESFilmicToneMapping } from "three";
import Scene from "./Scene/Scene";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { isMobile } from "react-device-detect";
import logo from "../../assets/logo.png";
import { FadeInOverlay } from "./Scene/FadeInOverlay";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Flip } from "gsap/Flip";
import { useStore } from "@nanostores/react";
import {
  isIntroFinished,
  isMenuVisible,
  modalContents,
  parentCounter,
  pinnedChild,
  showreelPosition,
  smoothTouch,
} from "./store/animationStore";
import { Welcome } from "./Welcome/Welcome";
import { About } from "./About/About";
import { Portfolio } from "./Portfiolio/Portfolio";
import { TrustedBy } from "./TrustedBy/TrustedBy";
import { Contact } from "./Contact/Contact";
import { cn } from "clsx-for-tailwind";
import { PortfolioDetailsModal } from "./Portfiolio/Details/PortfolioDetailsModal";

import { createStyleObject } from "@capsizecss/core";
import { fromFile } from "@capsizecss/unpack";
import { IOSOrientationModal } from "./Scene/Modals/IOSOrientationModal";
import { BraveOrientationModal } from "./Scene/Modals/BraveOrientationModal";

window.React = React;

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, Flip);
const ua = window.navigator.userAgent;
const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
const webkit = !!ua.match(/WebKit/i);
const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

var observer = ScrollTrigger.normalizeScroll(true);

ScrollTrigger.observe({
  target: "#hero",
  onUp: () =>
    isMenuVisible.set(
      isIntroFinished.get() && !modalContents.get() && !isMobile
    ),
  onDown: () =>
    isMenuVisible.set(
      isIntroFinished.get() && !modalContents.get() && isMobile
    ),
});

// document.onclick = () => {
//   if (!document.fullscreenElement) {
//     // If the document is not in full screen mode
//     // make the video full screen
//     document.documentElement
//       .requestFullscreen({ navigationUI: "hide" })
//       .then(() => {
//         observer?.kill();
//         observer = ScrollTrigger.normalizeScroll(true);
//         screen.orientation
//           //@ts-ignore
//           .lock("portrait")
//           .then(() => {
//             observer?.kill();
//             observer = ScrollTrigger.normalizeScroll(true);
//           })
//           .catch((error) => {});
//       })
//       .catch((error) => {
//       });
//   } else {
//     document.exitFullscreen();
//     ScrollTrigger.normalizeScroll(true);
//   }
// };

export default function LandingPage() {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const $isIntroFinished = useStore(isIntroFinished);
  const $pinnedChild = useStore(pinnedChild);
  let $isMenuVisible = useStore(isMenuVisible);
  const $smoothTouch = useStore(smoothTouch);
  const [introFinishedOffset, setIntroFinishedOffset] = useState(false);

  useEffect(() => {
    if ($isIntroFinished) {
      setTimeout(() => {
        setIntroFinishedOffset(true);
      }, 100);
    }
  }, [$isIntroFinished]);

  useEffect(() => {
    ScrollSmoother.create({
      smooth: 2, // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: false, // looks for data-speed and data-lag attributes on elements
      smoothTouch: 0, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
      normalizeScroll: false,
    });
  }, []);

  const toggleMenu = () => {
    setIsMenuExpanded((prev) => !prev);

    const tl = gsap
      .timeline()
      .fromTo(
        "#mobile-menu",
        {
          opacity: 0,
          visibility: "hidden",
          transform: "translate(-50%, -25%)",
        },
        {
          opacity: 1,
          visibility: "visible",
          transform: "translate(-50%, 0%)",
          duration: 0.5,
        }
      )
      .fromTo(
        "#mobile-menu-shadow",
        {
          opacity: 0,
          visibility: "hidden",
          transform: "translate(0, -25%)",
        },
        {
          opacity: 1,
          visibility: "visible",
          transform: "translate(0, 0)",
          duration: 0.5,
        },
        "<"
      )
      .fromTo(
        ".nav-link",
        { y: -40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          delay: 0.5,
          stagger: {
            // wrap advanced options in an object
            each: 0.1,
            grid: "auto",
            ease: "power2.inOut",
          },
        },
        "<"
      )
      .pause();

    if (!isMenuExpanded) {
      tl.play();
    } else {
      tl.duration(0.5);
      tl.reverse(tl.endTime());
    }
  };

  // useGSAP(() => {
  //   gsap.fromTo(
  //     "#portfolio",
  //     { y: "100vh" },
  //     {
  //       y: 0,
  //       scrollTrigger: {
  //         trigger: "#portfolio",
  //         start: "top-=800",
  //         end: "bottom-=400",
  //         markers: true,
  //       },
  //     }
  //   );
  // });

  const desktopGoTo = (selector: string | number, position?: string) => {
    isMenuVisible.set(false);

    ScrollSmoother.get()?.scrollTo(selector, true, position);
  };

  const mobileGoTo = (selector: string | number, position?: string) => {
    toggleMenu();

    //ScrollSmoother.get()?.kill();

    setTimeout(() => {
      isMenuVisible.set(false);
      ScrollSmoother.get()?.scrollTo(selector, true, position);
    }, 500);
  };

  return (
    <div>
      <div
        id="fixed-container"
        className="w-full h-screen bg-transparent top-0 pointer-events-none left-0 z-50 fixed opacity-100"
      >
        <div
          className={cn(
            `w-full h-28 md:h-36 p-8 md:p-8 md:px-16 opacity-0 from-[rgba(0,0,0,0.75)] transition-opacity to-transparent bg-gradient-to-b flex justify-between relative`,
            {
              ["opacity-100"]: $isMenuVisible,
            }
          )}
        >
          <img
            id="logo"
            src={logo.src}
            alt=""
            width="172px"
            height="48px"
            className="h-[48px] w-[172px] opacity-0 z-20"
          />
          <button
            id="hamburger"
            className={`menu md:hidden pointer-events-auto opacity-0 z-20 ${
              isMenuExpanded ? "opened" : ""
            }`}
            onClickCapture={(e) => {
              e.nativeEvent.stopImmediatePropagation();
              e.stopPropagation();
              e.nativeEvent.stopPropagation();
              toggleMenu();
            }}
          >
            <svg width="36" height="36" viewBox="0 0 100 100">
              <path
                className="line line1"
                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
              />
              <path className="line line2" d="M 20,50 H 80" />
              <path
                className="line line3"
                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
              />
            </svg>
          </button>
          <div
            id="mobile-menu-shadow"
            className="absolute opacity-0 z-10 w-[120%] h-[120vh] top-[0%] left-[-10%] from-50% bg-gradient-to-b from-[rgba(0,0,0,0.75)] to-transparent blur-xl backdrop-blur-xl"
          ></div>
          <div
            id="mobile-menu"
            className="absolute h-screen opacity-0 invisible left-[50%] top-0 translate-x-[-50%] z-20"
          >
            <nav className="text-white md:hidden font-semibold pointer-events-auto text-l tracking-[0.5em] h-[50vh] my-[25vh] justify-between uppercase flex flex-col items-center">
              <a
                onClick={() => mobileGoTo(showreelPosition.get())}
                className="nav-link -translate-y-[40px] opacity-0"
              >
                showreel
              </a>
              <a
                onClick={() => mobileGoTo("#welcome", "top top")}
                className="nav-link -translate-y-[40px] opacity-0"
              >
                portfolio
              </a>
              <a
                onClick={() => mobileGoTo("#about", "top top")}
                className="nav-link -translate-y-[40px] opacity-0"
              >
                o nas
              </a>
              <a
                onClick={() => mobileGoTo("#contact", "65% center")}
                className="nav-link -translate-y-[40px] opacity-0"
              >
                kontakt
              </a>
            </nav>
          </div>
          <nav className="text-white hidden font-semibold pointer-events-auto text-xs  gap-20 tracking-[0.5em] items-center uppercase md:flex">
            <a
              onClick={() => desktopGoTo(showreelPosition.get())}
              className="nav-link opacity-0 cursor-pointer hover:text-pink-300 transition-colors"
            >
              showreel
            </a>
            <a
              onClick={() => desktopGoTo("#welcome", "65% center")}
              className="nav-link opacity-0  cursor-pointer hover:text-pink-300 transition-colors"
            >
              portfolio
            </a>
            <a
              onClick={() => desktopGoTo("#about", "top top")}
              className="nav-link opacity-0  cursor-pointer hover:text-pink-300 transition-colors"
            >
              o nas
            </a>
            <a
              onClick={() => desktopGoTo("#contact", "65% center")}
              className="nav-link opacity-0  cursor-pointer hover:text-pink-300 transition-colors"
            >
              kontakt
            </a>
          </nav>
        </div>
        <PortfolioDetailsModal />
        <IOSOrientationModal />
        <BraveOrientationModal />
      </div>

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="h-screen" id="hero">
            <FadeInOverlay />
            <Leva hidden />

            <Canvas
              style={{
                pointerEvents: isMobile ? "none" : "auto",
              }}
              camera={{ fov: 20 }}
              gl={{
                antialias: true,
                preserveDrawingBuffer: false,
                toneMapping: ACESFilmicToneMapping,
                toneMappingExposure: 1,
                outputColorSpace: SRGBColorSpace,
                powerPreference: "high-performance",
                transmissionResolutionScale: 0.5,
              }}
            >
              <PerformanceMonitor
                bounds={(refreshRate) => [60, refreshRate]}
                factor={0.5}
                step={0.2}
              >
                <Scene />
                {/* <Perf  position="top-left" style={{ transform: "scale(0.8)" }} /> */}
              </PerformanceMonitor>
            </Canvas>
          </div>

          <div id="section-wrapper-0-1" style={{ position: "relative" }}>
            <div
              id="portfolio"
              className={`w-full relative`}
              style={{
                background: `url("image.png")`,
                marginTop: 0, //introFinishedOffset ? "-100vh" : 0,
                borderRadius: "25px 25px 0 0",
                backgroundRepeat: "no-repeat",
                backgroundSize: isMobile
                  ? "200vh calc(100% + 350px)"
                  : "200vh 105%",
                boxShadow: "0px -15px 50px 10px #080a13",
                backgroundPosition: isMobile ? "50% 0" : "50% 0",
                display: $isIntroFinished ? "block" : "none",
              }}
            >
              <Welcome />
              <Portfolio
                projects={[
                  {
                    name: `Proszę tańcz`,
                    clientName: "Dawid Kwiatkowski / Kayah",
                    director: "Tomek Wilczyński",
                    dop: "Piotr Kosmalski",
                    fullVideoUrl: "https://www.youtube.com/watch?v=ZHMxzwOSkIU",
                    stills: [
                      {
                        thumbSrc: "projects/prosze_tancz/miniatura.png",
                      },
                      {
                        thumbSrc: "projects/prosze_tancz/1.png",
                      },
                      {
                        thumbSrc: "projects/prosze_tancz/2.png",
                      },
                      {
                        thumbSrc: "projects/prosze_tancz/3.png",
                      },
                      {
                        thumbSrc: "projects/prosze_tancz/4.png",
                      },

                      {
                        thumbSrc: "projects/prosze_tancz/5.png",
                      },
                      {
                        thumbSrc: "projects/prosze_tancz/6.png",
                      },
                      {
                        thumbSrc: "projects/prosze_tancz/9.png",
                      },
                    ],
                  },
                  {
                    name: `Piegi`,
                    clientName: "Otsochodzi",
                    director: "Mac Adamczak",
                    dop: "Aleksy Kubiak",
                    fullVideoUrl: "https://www.youtube.com/watch?v=kXeNzSWxDmA",
                    stills: [
                      {
                        thumbSrc: "projects/piegi/miniatura.png",
                      },
                      {
                        thumbSrc: "projects/piegi/1.png",
                      },
                      {
                        thumbSrc: "projects/piegi/3.png",
                      },
                      {
                        thumbSrc: "projects/piegi/4.png",
                      },

                      {
                        thumbSrc: "projects/piegi/5.png",
                      },
                      {
                        thumbSrc: "projects/piegi/6.png",
                      },
                      {
                        thumbSrc: "projects/piegi/7.png",
                      },
                      {
                        thumbSrc: "projects/piegi/8.png",
                      },
                      {
                        thumbSrc: "projects/piegi/9.png",
                      },
                      {
                        thumbSrc: "projects/piegi/10.png",
                      },
                      {
                        thumbSrc: "projects/piegi/11.png",
                      },
                      {
                        thumbSrc: "projects/piegi/12.png",
                      },
                    ],
                  },
                  {
                    name: `Zdrowa księgowość`,
                    clientName: "TVC: Infakt",
                    director: "Mac Adamczak",
                    dop: "Maciej Ryter",
                    fullVideoUrl: "https://www.youtube.com/watch?v=zyXzkmzrRVc",
                    stills: [
                      {
                        thumbSrc: "projects/infakt/1.png",
                      },
                      {
                        thumbSrc: "projects/infakt/2.png",
                      },
                      {
                        thumbSrc: "projects/infakt/3.png",
                      },
                      {
                        thumbSrc: "projects/infakt/4.png",
                      },
                      {
                        thumbSrc: "projects/infakt/6.png",
                      },
                      {
                        thumbSrc: "projects/infakt/7.png",
                      },
                      {
                        thumbSrc: "projects/infakt/8.png",
                      },
                    ],
                  },
                  {
                    name: `Windows 11 Pro`,
                    clientName: "x-kom / Microsoft",
                    director: "Tomek Wilczyński",
                    dop: "Dima Zinych",
                    fullVideoUrl: "https://www.youtube.com/watch?v=MWSsUxALs0w",
                    stills: [
                      {
                        thumbSrc: "projects/windows/1.png",
                      },
                      {
                        thumbSrc: "projects/windows/2.png",
                      },
                      {
                        thumbSrc: "projects/windows/3.png",
                      },
                      {
                        thumbSrc: "projects/windows/4.png",
                      },
                      {
                        thumbSrc: "projects/windows/6.png",
                      },
                      {
                        thumbSrc: "projects/windows/7.png",
                      },
                      {
                        thumbSrc: "projects/windows/8.png",
                      },
                    ],
                  },
                  {
                    name: `Listy do M.6\n- rozstania i powroty`,
                    clientName: "TVN Discovery Warner Bros.",
                    director: "Jan Steifer",
                    dop: "Stasiek Wójcik",
                    fullVideoUrl: "https://www.youtube.com/watch?v=tzSzi1fw8LI",
                    stills: [
                      {
                        thumbSrc: "projects/listy/1.png",
                      },
                      {
                        thumbSrc: "projects/listy/2.png",
                      },
                      {
                        thumbSrc: "projects/listy/3.png",
                      },
                      {
                        thumbSrc: "projects/listy/4.png",
                      },
                      {
                        thumbSrc: "projects/listy/6.png",
                      },
                      {
                        thumbSrc: "projects/listy/7.png",
                      },
                      {
                        thumbSrc: "projects/listy/8.png",
                      },
                      {
                        thumbSrc: "projects/listy/9.png",
                      },
                      {
                        thumbSrc: "projects/listy/10.png",
                      },
                    ],
                  },
                  {
                    name: `Widok`,
                    clientName: "Jan Rapowanie / Frankleen / 2020",
                    director: "Mac Adamczak",
                    dop: "Montell Taraschewski",
                    fullVideoUrl: "https://www.youtube.com/watch?v=zJk3HJUfEus",
                    stills: [
                      {
                        thumbSrc: "projects/widok/1.png",
                      },
                      {
                        thumbSrc: "projects/widok/2.png",
                      },
                      {
                        thumbSrc: "projects/widok/3.png",
                      },
                      {
                        thumbSrc: "projects/widok/4.png",
                      },
                      {
                        thumbSrc: "projects/widok/5.png",
                      },
                      {
                        thumbSrc: "projects/widok/6.png",
                      },
                    ],
                  },
                  {
                    name: `Błękit`,
                    clientName: "Roxie",
                    director: "Tomek Wilczyński",
                    dop: "Dima Zinych",
                    fullVideoUrl: "https://www.youtube.com/watch?v=ml9Ktn073So",
                    stills: [
                      {
                        thumbSrc: "projects/blekit/1.jpg",
                      },
                      {
                        thumbSrc: "projects/blekit/2.png",
                      },
                      {
                        thumbSrc: "projects/blekit/3.png",
                      },
                      {
                        thumbSrc: "projects/blekit/4.jpg",
                      },
                      {
                        thumbSrc: "projects/blekit/6.png",
                      },
                      {
                        thumbSrc: "projects/blekit/7.jpg",
                      },
                      {
                        thumbSrc: "projects/blekit/8.jpg",
                      },
                      {
                        thumbSrc: "projects/blekit/9.jpg",
                      },
                      {
                        thumbSrc: "projects/blekit/10.jpg",
                      },
                      {
                        thumbSrc: "projects/blekit/11.png",
                      },
                      {
                        thumbSrc: "projects/blekit/12.png",
                      },
                    ],
                  },
                  {
                    name: `Michał Sikorski x Szymon Majewski`,
                    clientName: "x-kom",
                    director: "Tomek Wilczyński",
                    dop: "Montell Taraschewski",
                    fullVideoUrl: "https://www.instagram.com/reel/DDG38iVIOoV/",
                    stills: [
                      {
                        thumbSrc: "projects/xkom/miniatura.png",
                      },
                      {
                        thumbSrc: "projects/xkom/1.png",
                      },
                      {
                        thumbSrc: "projects/xkom/2.png",
                      },
                      {
                        thumbSrc: "projects/xkom/3.png",
                      },
                      {
                        thumbSrc: "projects/xkom/4.png",
                      },
                      {
                        thumbSrc: "projects/xkom/6.png",
                      },
                      {
                        thumbSrc: "projects/xkom/7.png",
                      },
                      {
                        thumbSrc: "projects/xkom/8.png",
                      },
                    ],
                  },
                  {
                    name: `Od nowa`,
                    clientName: "Kwiat Jabłoni",
                    director: "Rodzeństwo Ejryszew (DRAŻE) ",
                    dop: "Łukasz Łatanik / Wiktor Ejryszew",
                    fullVideoUrl: "https://www.youtube.com/watch?v=HMIbm_l0nMg",
                    stills: [
                      {
                        thumbSrc: "projects/odnowa/miniatura.png",
                      },
                      {
                        thumbSrc: "projects/odnowa/1.png",
                      },
                      {
                        thumbSrc: "projects/odnowa/3.png",
                      },
                      {
                        thumbSrc: "projects/odnowa/4.png",
                      },
                      {
                        thumbSrc: "projects/odnowa/6.png",
                      },
                      {
                        thumbSrc: "projects/odnowa/7.png",
                      },
                      {
                        thumbSrc: "projects/odnowa/8.png",
                      },
                      {
                        thumbSrc: "projects/odnowa/9.png",
                      },
                      {
                        thumbSrc: "projects/odnowa/10.png",
                      },
                      {
                        thumbSrc: "projects/odnowa/11.png",
                      },
                      {
                        thumbSrc: "projects/odnowa/12.png",
                      },
                      {
                        thumbSrc: "projects/odnowa/13.png",
                      },
                      {
                        thumbSrc: "projects/odnowa/14.png",
                      },
                    ],
                  },
                  {
                    name: `Milczysz`,
                    clientName: "Julia Wieniawa",
                    director: "Maciej Aleksander Bierut",
                    dop: "Karol Łakomiec",
                    fullVideoUrl: "https://www.youtube.com/watch?v=34454W2JG1c",
                    stills: [
                      {
                        thumbSrc: "projects/milczysz/miniatura.png",
                      },
                      {
                        thumbSrc: "projects/milczysz/1.png",
                      },
                      {
                        thumbSrc: "projects/milczysz/2.png",
                      },
                      {
                        thumbSrc: "projects/milczysz/4.png",
                      },
                      {
                        thumbSrc: "projects/milczysz/5.png",
                      },
                      {
                        thumbSrc: "projects/milczysz/6.png",
                      },
                    ],
                  },
                  {
                    name: `Prosimy dotykać`,
                    clientName: "Cheetos",
                    director: "Marek Sobkiewicz-Hirsch",
                    dop: "Dima Zinych",
                    fullVideoUrl: "https://www.youtube.com/watch?v=AWR-bck1Ul8",
                    stills: [
                      {
                        thumbSrc: "projects/cheetos/miniatura.png",
                      },
                      {
                        thumbSrc: "projects/cheetos/1.png",
                      },
                      {
                        thumbSrc: "projects/cheetos/2.png",
                      },
                      {
                        thumbSrc: "projects/cheetos/3.png",
                      },
                      {
                        thumbSrc: "projects/cheetos/4.png",
                      },
                      {
                        thumbSrc: "projects/cheetos/5.png",
                      },
                      {
                        thumbSrc: "projects/cheetos/6.png",
                      },
                      {
                        thumbSrc: "projects/cheetos/7.png",
                      },
                      {
                        thumbSrc: "projects/cheetos/8.png",
                      },
                      {
                        thumbSrc: "projects/cheetos/9.png",
                      },
                      {
                        thumbSrc: "projects/cheetos/10.png",
                      },
                    ],
                  },
                  {
                    name: `Beze mnie`,
                    clientName: "Dawid Kwiatkowski",
                    director: "Tomek Wilczyński",
                    dop: "Dima Zinych",
                    fullVideoUrl: "https://www.youtube.com/watch?v=J1A7lFi16hg",
                    stills: [
                      {
                        thumbSrc: "projects/bezemnie/miniatura.jpg",
                      },
                      {
                        thumbSrc: "projects/bezemnie/1.png",
                      },
                      {
                        thumbSrc: "projects/bezemnie/2.jpg",
                      },
                      {
                        thumbSrc: "projects/bezemnie/3.jpg",
                      },
                      {
                        thumbSrc: "projects/bezemnie/4.png",
                      },
                      {
                        thumbSrc: "projects/bezemnie/5.jpg",
                      },
                      {
                        thumbSrc: "projects/bezemnie/6.jpg",
                      },
                      {
                        thumbSrc: "projects/bezemnie/7.jpg",
                      },
                      {
                        thumbSrc: "projects/bezemnie/8.jpg",
                      },
                      {
                        thumbSrc: "projects/bezemnie/10.jpg",
                      },
                      {
                        thumbSrc: "projects/bezemnie/11.jpg",
                      },
                      {
                        thumbSrc: "projects/bezemnie/12.jpg",
                      },
                      {
                        thumbSrc: "projects/bezemnie/13.jpg",
                      },
                      {
                        thumbSrc: "projects/bezemnie/14.jpg",
                      },
                      {
                        thumbSrc: "projects/bezemnie/15.jpg",
                      },
                      {
                        thumbSrc: "projects/bezemnie/16.jpg",
                      },
                    ],
                  },
                  {
                    name: `#MATA2040`,
                    clientName: "MATA",
                    director: "Tomek Wilczyński",
                    dop: "Adam Andrzejewski",
                    fullVideoUrl: "https://www.youtube.com/watch?v=bhv0jkADve8",
                    stills: [
                      {
                        thumbSrc: "projects/mata/miniatura.png",
                      },
                      {
                        thumbSrc: "projects/mata/2.png",
                      },
                      {
                        thumbSrc: "projects/mata/3.png",
                      },
                    ],
                  },
                  {
                    name: `Bliżej`,
                    clientName: "Natalia Kukulska",
                    director: "Daniel Jaroszek",
                    dop: "Mateusz Dziekoński",
                    fullVideoUrl: "https://www.youtube.com/watch?v=JUEe70iQBDc",
                    stills: [
                      {
                        thumbSrc: "projects/blizej/miniatura.png",
                      },
                      {
                        thumbSrc: "projects/blizej/1.png",
                      },
                      {
                        thumbSrc: "projects/blizej/2.png",
                      },
                      {
                        thumbSrc: "projects/blizej/4.png",
                      },
                      {
                        thumbSrc: "projects/blizej/5.png",
                      },
                      {
                        thumbSrc: "projects/blizej/6.png",
                      },
                      {
                        thumbSrc: "projects/blizej/7.png",
                      },
                      {
                        thumbSrc: "projects/blizej/9.png",
                      },
                      {
                        thumbSrc: "projects/blizej/10.png",
                      },
                    ],
                  },
                  {
                    name: `Dziewczyna z walizką`,
                    clientName: "48HFP / 77. Festiwal Filmowy w Cannes",
                    director: "Tomek Wilczyński",
                    dop: "Stasiek Wójcik",
                    fullVideoUrl: "https://www.youtube.com/watch?v=4DTFXpAZ6bg",
                    stills: [
                      {
                        thumbSrc: "projects/walizka/5.png",
                      },
                      {
                        thumbSrc: "projects/walizka/1.png",
                      },
                      {
                        thumbSrc: "projects/walizka/2.png",
                      },
                      {
                        thumbSrc: "projects/walizka/3.png",
                      },
                      {
                        thumbSrc: "projects/walizka/4.png",
                      },
                      {
                        thumbSrc: "projects/walizka/6.png",
                      },
                      {
                        thumbSrc: "projects/walizka/7.png",
                      },
                      {
                        thumbSrc: "projects/walizka/8.png",
                      },
                      {
                        thumbSrc: "projects/walizka/9.png",
                      },
                      {
                        thumbSrc: "projects/walizka/10.png",
                      },
                      {
                        thumbSrc: "projects/walizka/11.png",
                      },
                      {
                        thumbSrc: "projects/walizka/12.png",
                      },
                    ],
                  },
                ]}
              />
              <TrustedBy />
              <About />
              <Contact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
