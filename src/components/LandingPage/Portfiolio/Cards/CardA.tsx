import { Fragment, useEffect, useRef, useState } from "react";
import type { Project } from "../../../../types/portfolio";
import { cn } from "clsx-for-tailwind";
import { useGSAP } from "@gsap/react";
import ScrollSmoother from "gsap/ScrollSmoother";
import gsap from "gsap";
import { isModalOpen, modalContents } from "../../store/animationStore";

interface CardAProps {
  project: Project;
}

export const CardA = ({ project }: CardAProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const art = (
    <div
      ref={cardRef}
      onClick={() => {
        modalContents.set(project);
        isModalOpen.set(true);
        // const scrollSmoother = ScrollSmoother.get();
        // if (!isOpen) {
        //   console.log(cardRef.current?.getBoundingClientRect());
        //   scrollSmoother?.paused(true);
        //   gsap.to(cardRef.current, { scale: 2, zIndex: 99999, duration: 0.5 });
        // } else {
        //   scrollSmoother?.paused(false);
        //   gsap.to(cardRef.current, { scale: 1, zIndex: 1, duration: 0.5 });
        // }
      }}
      className={cn(
        `md:mb-0 my-4 md:my-0 scale-100 origin-top md:-mt-24 mx-auto aspect-video rounded-2xl w-full md:w-2/3 h-auto relative md:-top-24`
      )}
    >
      <article
        id={`cardA-${project.name.replaceAll(" ", "")}-article`}
        style={{
          backgroundImage: `url(thumb_bg_2.png)`,
          backgroundSize: "cover",
        }}
        className={cn(
          `p-4 cursor-pointer group aspect-video rounded-2xl w-full h-auto absolute`
        )}
      >
        <div className="absolute w-full -bottom-12 md:-bottom-14 left-1/6 md:left-1/4 z-20">
          <h3 className="mt-1 text-white text-3xl md:text-4xl font-bold text-shadow-md text-shadow-black-500">
            {project.name}
          </h3>
          <h4 className="-mt-2 text-white text-xl md:text-2xl  text-shadow-md text-shadow-black-500 font-[Chivo_Mono]">
            {project.clientName}
          </h4>
        </div>

        <div
          className={`relative w-full h-full bg-no-repeat rounded-xl group-hover:scale-95 transition-transform duration-750 ease-out`}
        >
          <img
            className="block rounded-xl w-full h-full"
            crossOrigin="anonymous"
            src={project.stills[0]?.thumbSrc}
          />
        </div>
      </article>
    </div>
  );

  return art;
};
