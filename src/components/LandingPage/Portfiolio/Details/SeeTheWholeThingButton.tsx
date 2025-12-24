import { useStore } from "@nanostores/react";
import { modalContents } from "../../store/animationStore";

export const SeeTheWholeThingButton = () => {
  const $modalContents = useStore(modalContents);

  return $modalContents ? (
    <div className="self-center flex flex-col items-center w-min h-min m-auto row-start-2 md:row-start-1 md:col-span-5 md:col-start-7">
      <a
        href={$modalContents?.fullVideoUrl}
        target="_blank"
        className="w-max text-xs md:text-sm mt-8 md:mt-0  pt-3.5 font-safari-safe mb-4 cursor-pointer block text-white font-bold bg-[#2C67FF] rounded-xl px-8 py-2 hover:scale-110 hover:brightness-110 transition-all duration-250 "
      >
        ZOBACZ CAŁOŚĆ
      </a>
    </div>
  ) : null;
};
