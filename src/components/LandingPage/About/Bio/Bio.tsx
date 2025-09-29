import { useEffect } from "react";
import SplitText from "gsap/SplitText";
import gsap from "gsap";
import { isMobile } from "react-device-detect";

interface BioProps {
  imgSrc: string;
  name: string;
  description: string;
  left?: string;
}

export const Bio = ({ imgSrc, name, description, left }: BioProps) => {
  const nameWithoutSpaces = name.replaceAll("\n", "");

  useEffect(() => {
    SplitText.create(`#bio-text-${nameWithoutSpaces}`, {
      type: "lines",
      autoSplit: true,
      mask: "lines",
      linesClass: "bio-line",
      onSplit: (self) => {
        return gsap.from(self.lines, {
          y: 0,
          opacity: 0,
          stagger: 0.05,
          duration: 0.75,
          scrollTrigger: {
            trigger: `#bio-${nameWithoutSpaces}`,
            start: isMobile ? "top-=400" : "top-=800",
            end: isMobile ? "bottom-=650" : "bottom-=1200",
            scrub: 0,
            pin: false,
          },
        });
      },
    });
  }, []);

  return (
    <article
      id={`bio-${nameWithoutSpaces}`}
      className="md:w-[45ch] flex flex-col items-center p-8"
    >
      <img className="rounded-full w-3/5" src={imgSrc} />
      <h2
        className={`text-white text-2xl font-[Aktiv_Grotesk_Ex] font-extrabold whitespace-pre-line relative -top-8 ${
          !left && "-left-8"
        } md:right-10 ${left}`}
      >
        {name}
      </h2>
      <div id={`bio-text-${nameWithoutSpaces}`} className="relative md:left-8">
        <p className="font-[Chivo_Mono] text-white md:w-[35ch] whitespace-pre-line text-sm text-justify">
          {description}
        </p>
      </div>
    </article>
  );
};
