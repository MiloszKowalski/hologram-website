import type { Project } from "../../../../types/portfolio";
import { isModalOpen, modalContents } from "../../store/animationStore";

interface CardBProps {
  project: Project;
}

export const CardB = ({ project }: CardBProps) => {
  return (
    <article
      onClick={() => {
        modalContents.set(project);
        isModalOpen.set(true);
      }}
      style={{
        backgroundImage: `url(thumb_bg_1.png)`,
        backgroundSize: "cover",
      }}
      className="p-4 my-4 md:my-0 cursor-pointer group md:ml-auto aspect-video rounded-2xl w-11/12 mx-auto md:mx-0 md:w-3/7 h-auto relative"
    >
      <div className="absolute whitespace-pre md:whitespace-normal w-full md:w-full top-[94%] md:top-[97%] left-1/16 md:left-1/7 z-20">
        <h3 className="my-0  leading-6 text-white text-xl md:text-2xl font-bold text-shadow-md text-shadow-black-500">
          {project.name}
        </h3>
        <h4 className=" text-white text-sm md:text-base text-shadow-md text-shadow-black-500 font-[Chivo_Mono]">
          {project.clientName}
        </h4>
      </div>
      <div
        className={`relative w-full h-full bg-no-repeat rounded-xl group-hover:scale-95 transition-transform duration-750 ease-out`}
      >
        <img
          className="block rounded-xl w-full h-full"
          crossOrigin="anonymous"
          src={project.thumbSrc}
        />
      </div>
    </article>
  );
};
