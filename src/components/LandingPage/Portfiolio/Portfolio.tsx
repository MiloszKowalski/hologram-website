import type { Project } from "../../../types/portfolio";
import { CardA } from "./Cards/CardA";
import { CardB } from "./Cards/CardB";
import { CardC } from "./Cards/CardC";

export interface PortfolioProps {
  projects: Project[];
}

export const Portfolio = ({ projects }: PortfolioProps) => {
  return (
    <section className="p-4 md:p-0 -mt-8 md:mt-96">
      <h2 className="text-white text-2xl font-bold text-center relative -top-12 md:-top-64">
        NASZE PROJEKTY
      </h2>
      <div className="flex flex-col gap-20 md:gap-16 max-w-7xl mx-auto">
        {projects.map((project, index) => {
          if (index % 3 === 0) {
            return (
              <CardA
                key={project.name.replaceAll(" ", "").replaceAll("\n", "")}
                project={project}
              />
            );
          } else if (index % 3 === 1) {
            return (
              <CardB
                key={project.name.replaceAll(" ", "").replaceAll("\n", "")}
                project={project}
              />
            );
          }

          return (
            <CardC
              key={project.name.replaceAll(" ", "").replaceAll("\n", "")}
              project={project}
            />
          );
        })}
      </div>
      <button className="hidden mx-auto md:-mt-16 pt-3.5 font-safari-safe mt-36 text-md md:text-xl cursor-pointer text-white bg-[#2C67FF] rounded-xl px-8 py-2 font-bold hover:scale-110 hover:brightness-110 transition-all duration-250">
        ZOBACZ WIĘCEJ
      </button>
    </section>
  );
};
