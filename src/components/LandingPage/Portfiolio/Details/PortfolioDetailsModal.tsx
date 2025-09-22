import { useStore } from "@nanostores/react";
import {
  isIntroFinished,
  isMenuVisible,
  isModalOpen,
  modalContents,
} from "../../store/animationStore";
import { cn } from "clsx-for-tailwind";
import { useCallback, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ReactPlayer from "react-player";

export const PortfolioDetailsModal = () => {
  const $modalContents = useStore(modalContents);
  const $isModalOpen = useStore(isModalOpen);
  const $isIntroFinished = useStore(isIntroFinished);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const stillsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const scrollSmoother = ScrollSmoother.get();

    if (!$isIntroFinished) {
      return;
    }

    if (!$isModalOpen) {
      scrollSmoother?.paused(false);
      gsap.to(backdropRef.current, {
        display: "none",
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.5,
      });
      gsap.to(modalRef.current, {
        display: "none",
        opacity: 0,
        filter: "blur(10px)",
        scale: 0.9,
        duration: 0.5,
      });
    } else {
      stillsRef.current?.scrollTo(0, 0);
      isMenuVisible.set(false);
      scrollSmoother?.paused(true);
      gsap.to(backdropRef.current, {
        display: "block",
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.5,
      });
      gsap.to(modalRef.current, {
        display: "flex",
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        duration: 0.5,
      });
    }
  }, [$isModalOpen]);

  const closeModal = useCallback((e: MouseEvent) => {
    console.log(e);
    setTimeout(() => {
      isModalOpen.set(false);
      setTimeout(() => modalContents.set(null), 500);
    }, 50);
  }, []);

  useEffect(() => {
    backdropRef.current?.addEventListener("click", closeModal, {
      capture: true,
    });
  }, [backdropRef.current]);

  return (
    <div className="relative">
      <div
        ref={backdropRef}
        className={cn(
          `hidden opacity-0 pointer-events-auto -mt-28 md:-mt-36 w-screen relative h-[100vh] bg-[rgba(0,0,0,0.58)] backdrop-blur-xs`
        )}
      />
      <div
        ref={modalRef}
        className="hidden pointer-events-none md:overflow-hidden opacity-0 z-[9999] text-white absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2  w-full h-screen md:w-7/8 p-[2px] md:h-[95vh] md:max-w-[860px] md:rounded-2xl  flex-col bg-gradient-to-br from-[#2C67FF] to-[#2C67FF88] mx-auto"
      >
        <button
          className="absolute pointer-events-auto font-bold right-0 top-0 mb-16 text-3xl mr-8 mt-8 cursor-pointer hover:scale-120 transition-transform"
          onClick={(e) => closeModal(e.nativeEvent)}
        >
          X
        </button>
        <div
          ref={stillsRef}
          className="overflow-auto [&::-webkit-scrollbar]:w-1
            [&::-webkit-scrollbar-thumb]:via-[#214bb8]

            [&::-webkit-scrollbar-thumb]:via-50%
            [&::-webkit-scrollbar-thumb]:bg-gradient-to-b
              [&::-webkit-scrollbar-thumb]:[#5a5a5a46]
              [&::-webkit-scrollbar-thumb]:rounded-2xl
              [&::-webkit-scrollbar-track]:rounded-2xl
              [&::-webkit-scrollbar-track]:border-t-8
              [&::-webkit-scrollbar-track]:border-t-[#2250c3]
              [&::-webkit-scrollbar-track]:border-b-8
              [&::-webkit-scrollbar-track]:border-b-[#163074]
              [&::-webkit-scrollbar-track]:bg-gradient-to-b
            [&::-webkit-scrollbar-track]:from-[#072879]
            [&::-webkit-scrollbar-track]:to-[#021544] pointer-events-auto w-full h-full md:max-w-[1280px] flex flex-col bg-[#0f0f0fae] md:rounded-[calc(1rem-2px)]"
        >
          <div className="mt-8 md:mt-10 grid md:grid-cols-11 md:px-8">
            <div className="md:col-end-7 self-center text-center md:text-left whitespace-pre md:whitespace-normal md:col-start-1 md:ml-2">
              <h2 className="uppercase font-bold mb-1 text-[10px] md:text-xs">
                {$modalContents?.clientName}
              </h2>
              <h1 className="uppercase my-4 md:my-0 font-bold text-xl md:text-2xl leading-7">
                {$modalContents?.name}
              </h1>
              <h3 className="uppercase text-xs md:text-sm mt-1 font-[Chivo_Mono]">
                REŻ. {$modalContents?.director}
              </h3>
              <h3 className="uppercase text-xs md:text-sm md:-mt-1 font-[Chivo_Mono]">
                DOP. {$modalContents?.dop}
              </h3>
            </div>
            <div className="self-center flex flex-col items-center w-min h-min m-auto row-start-2 md:row-start-1 md:col-span-5 md:col-start-7">
              <a
                href={$modalContents?.fullVideoUrl}
                target="_blank"
                className="w-max text-xs md:text-sm mt-8 md:mt-0  pt-3.5 font-safari-safe mb-4 cursor-pointer block text-white font-bold bg-[#2C67FF] rounded-xl px-8 py-2 hover:scale-110 hover:brightness-110 transition-all duration-250 "
              >
                ZOBACZ CAŁOŚĆ
              </a>
            </div>
          </div>
          <div className="grid p-4 gap-x-4 gap-y-4 md:pt-8 md:grid-cols-2 auto-rows-max ">
            {$modalContents?.stills.map((x, i) => (
              <div
                className={cn(
                  `w-full aspect-video rounded-2xl overflow-clip`
                  // {
                  //   ["relative md:-top-24"]: i % 2 === 0,
                  // }
                )}
              >
                {x.videoSource ? (
                  <div className="aspect-video w-full">
                    <ReactPlayer
                      src={x.videoSource}
                      loop
                      controls={false}
                      muted
                      autoPlay
                      style={{
                        width: "100%",
                        height: "auto",
                        aspectRatio: "16/9",
                      }}
                    />
                  </div>
                ) : (
                  <img
                    className="block"
                    crossOrigin="anonymous"
                    src={x.thumbSrc}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
