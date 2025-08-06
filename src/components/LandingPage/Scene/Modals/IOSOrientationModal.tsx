import { useStore } from "@nanostores/react";
import {
  isIntroFinished,
  isMenuVisible,
  isModalOpen,
  modalContents,
} from "../../store/animationStore";
import { cn } from "clsx-for-tailwind";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";

export const IOSOrientationModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const $isIntroFinished = useStore(isIntroFinished);

  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

  const [isIosModalOpen, setIsIosModalOpen] = useState(false);
  const [isPermissionRequired, setIsPermissionRequired] = useState(false);

  useEffect(() => {
    try {
      window.addEventListener("deviceorientation", () => {}, false);
    } catch {
      setIsPermissionRequired(true);
    }
  }, []);

  useEffect(() => {
    if ($isIntroFinished && iOSSafari) {
      setIsIosModalOpen(true);
    }
  }, [$isIntroFinished]);

  useGSAP(() => {
    const scrollSmoother = ScrollSmoother.get();
    if (!isIosModalOpen) {
      scrollSmoother?.paused(false);
      gsap.to(modalRef.current, {
        display: "none",
        opacity: 0,
        filter: "blur(10px)",
        scale: 0.9,
        duration: 0.5,
      });
    } else {
      isMenuVisible.set(false);
      scrollSmoother?.paused(true);
      gsap.to(modalRef.current, {
        display: "block",
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        duration: 0.5,
      });
    }
  }, [isIosModalOpen]);

  return (
    <div
      ref={modalRef}
      className={cn(
        `pointer-events-none text-white opacity-1 w-screen md:w-[110vw] md:-left-1/20  md:pt-[10vh] lg:pt-[10vh] xl:pt-[10vh] 2xl:pt-[15vh] -top-28 md:-top-[35vh] lg:-top-[25vh] xl:-top-[20vh] 2xl:md:-top-[18vh] z-[999999] relative h-[140vh] bg-[rgba(0,0,0,0.58)] backdrop-blur-xs`
      )}
    >
      <div className="pointer-events-auto w-full h-screen md:w-4/5 p-[2px] md:h-[80vh] md:max-w-[1282px] md:rounded-2xl flex flex-col bg-gradient-to-br from-[#2C67FF] to-transparent mx-auto">
        <div className="pointer-events-auto w-full h-full md:max-w-[1280px] flex flex-col bg-[#0f0f0fae] md:rounded-[calc(1rem-2px)]">
          <button
            className="self-end mb-16 text-3xl mr-8 mt-8 cursor-pointer"
            onClick={() => {
              setTimeout(() => {
                setIsIosModalOpen(false);
              }, 50);
            }}
          >
            X
          </button>
          <div className="-mt-8 md:-mt-16 md:mb-8 grid md:grid-cols-2">
            <h1 className="text-white mt-24 font-bold text-center text-3xl">
              Jeszcze chwilka...
            </h1>
            <p className="mx-8 text-center text-xl mt-24 font-[Chivo_Mono]">
              Wszedłeś na stronę z iPhone'a?
              <br />
              <br />
              Pozwól wykorzystać żyroskop, żeby zobaczyć mega bajer!
            </p>
            <button
              className="mx-auto pt-3.5 font-safari-safe mt-16 cursor-pointer block text-white font-bold bg-[#2C67FF] rounded-xl px-8 py-2 hover:scale-110 hover:brightness-110 transition-all duration-250"
              onClick={() => {
                if (
                  typeof DeviceMotionEvent !== "undefined" &&
                  "requestPermission" in DeviceMotionEvent &&
                  typeof DeviceMotionEvent.requestPermission === "function"
                ) {
                  DeviceMotionEvent.requestPermission()
                    .then((response: string) => {
                      if (response === "granted") {
                        window.addEventListener(
                          "deviceorientation",
                          () => {},
                          false
                        );
                        setTimeout(() => {
                          setIsIosModalOpen(false);
                        }, 50);
                      } else {
                        // Handle denied permission
                        console.log("Device orientation access denied");
                      }
                    })
                    .catch(console.error);
                }
              }}
            >
              Jasne!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
