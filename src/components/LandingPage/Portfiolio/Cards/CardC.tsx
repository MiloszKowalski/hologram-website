import type { Project } from "../../../../types/portfolio";
import { isModalOpen, modalContents } from "../../store/animationStore";

interface CardCProps {
  project: Project;
}

export const CardC = ({ project }: CardCProps) => {
  return (
    <article
      onClick={() => {
        modalContents.set(project);
        isModalOpen.set(true);
      }}
      style={{
        backgroundImage: `url(thumb_bg_3.png)`,
        backgroundSize: "cover",
      }}
      className="my-4 md:my-0 cursor-pointer p-4 group mr-auto aspect-video rounded-2xl w-19/20 mx-auto md:mx-0 md:w-1/2 h-auto relative md:-top-64"
    >
      <div className="absolute w-4/5 last:w-full top-31/32 text-shadow-lg text-white  md:-bottom-14 left-1/5 last:left-1/32 md:left-1/5 z-20">
        <h3 className="my-0 text-2xl md:text-4xl text-shadow-black-900  text-shadow-[3px_32px_0px_3px_black] font-bold">
          {project.name}
        </h3>
        <h4 className="-mt-2  text-lg md:text-2xl text-shadow-md text-shadow-black-500 font-[Chivo_Mono]">
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
  );
};
