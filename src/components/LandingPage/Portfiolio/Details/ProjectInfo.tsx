import { useStore } from "@nanostores/react";
import { modalContents } from "../../store/animationStore";

export const ProjectInfo = () => {
  const $modalContents = useStore(modalContents);
  return (
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
  );
};
