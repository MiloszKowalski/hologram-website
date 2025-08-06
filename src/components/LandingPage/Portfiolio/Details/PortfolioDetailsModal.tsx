import { useStore } from "@nanostores/react";
import {
  isMenuVisible,
  isModalOpen,
  modalContents,
} from "../../store/animationStore";
import { cn } from "clsx-for-tailwind";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ReactPlayer from "react-player";

export const PortfolioDetailsModal = () => {
  const $modalContents = useStore(modalContents);
  const $isModalOpen = useStore(isModalOpen);
  const modalRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const scrollSmoother = ScrollSmoother.get();
    if (!$isModalOpen) {
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
  }, [$isModalOpen]);

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
                isModalOpen.set(false);
                setTimeout(() => modalContents.set(null), 500);
              }, 50);
            }}
          >
            X
          </button>
          <div className="-mt-8 md:-mt-16 md:mb-8 grid md:grid-cols-2">
            <div className="row-start-2 md:row-start-1">
              <a
                href={$modalContents?.fullVideoUrl}
                target="_blank"
                className="w-max mx-auto mt-8 pt-3.5 font-safari-safe mb-16 cursor-pointer block text-white font-bold bg-[#2C67FF] rounded-xl px-8 py-2 hover:scale-110 hover:brightness-110 transition-all duration-250"
              >
                ZOBACZ CAŁOŚĆ
              </a>
            </div>
            <div className="mx-auto text-center">
              <h2 className="uppercase font-bold text-sm">
                {$modalContents?.clientName}
              </h2>
              <h1 className="uppercase font-bold text-4xl leading-relaxed">
                {$modalContents?.name}
              </h1>
              <h3 className="uppercase mt-4 font-[Chivo_Mono]">
                REŻ. {$modalContents?.director}
              </h3>
              <h3 className="uppercase font-[Chivo_Mono]">
                DOP. {$modalContents?.dop}
              </h3>
            </div>
          </div>
          <div
            className="grid p-8 md:p-16 gap-16 md:pt-24 md:grid-cols-2 auto-rows-max overflow-auto [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-red-100
            [&::-webkit-scrollbar-thumb]:bg-[#5a5a5a46]
              dark:[&::-webkit-scrollbar-thumb]:[#5a5a5a46]
              dark:[&::-webkit-scrollbar-thumb]:rounded-2xl
              dark:[&::-webkit-scrollbar-track]:rounded-2xl
              dark:[&::-webkit-scrollbar-track]:bg-gradient-to-b
            dark:[&::-webkit-scrollbar-track]:from-[#072879]
            dark:[&::-webkit-scrollbar-track]:to-[#021544]"
          >
            {$modalContents?.stills.map((x, i) => (
              <div
                className={cn(
                  `w-full max-w-[80vw] aspect-video rounded-2xl overflow-clip`,
                  {
                    ["relative md:-top-24"]: i % 2 === 0,
                  }
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
