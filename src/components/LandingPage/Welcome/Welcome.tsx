import { isMobile } from "react-device-detect";
import Icon from "../../../assets/hologram_multicolor.svg?react";
import { useEffect } from "react";
import SplitText from "gsap/SplitText";
import gsap from "gsap";

export const Welcome = () => {
  useEffect(() => {
    setTimeout(() => {
      SplitText.create("#welcome-text", {
        type: "lines",
        autoSplit: true,
        mask: "lines",
        onSplit: (self) => {
          return gsap.from(self.lines, {
            y: 100,
            opacity: 0,
            stagger: 0.05,
            duration: 2,
            scrollTrigger: {
              trigger: "#welcome",
              start: isMobile ? "top-=300" : "top-=400",
              end: isMobile ? "bottom-=500" : "top",
              scrub: 0,
              pin: false,
            },
          });
        },
      });
    }, 6000);
  }, []);

  return (
    <article
      id="welcome"
      className="flex flex-col w-full p-6 md:w-[70ch] gap-8 md:mx-auto pt-36 md:py-[50vh] md:translate-x-20 relative mb-48 md:mb-96 h-[60vh]"
    >
      <Icon className="absolute top-2/5 left-1/2 md:top-3/8 md:translate-y-[10%] md:-left-28 w-48 md:w-48 opacity-30 md:opacity-40" />
      <div id="welcome-text">
        <h1 className="text-white text-2xl mb-4 font-extrabold">
          Witaj w Studio Hologram.
        </h1>
        <p className="text-white text-md leading-8 font-[Chivo_Mono]">
          Jesteśmy warszawskim domem produkcyjnym, w którym każdy film nabiera
          życia.
          <br />
          Od 6 lat łączymy ludzi i ich historie, które zostawiają ślad.
        </p>
        <p className="text-white text-md font-[Chivo_Mono]">
          <br />
          Rozgość się i zobacz nasze rzeczy.
        </p>
      </div>
    </article>
  );
};
