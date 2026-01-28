import { modalContents } from "../../store/animationStore";
import { useStore } from "@nanostores/react";
import type { GetImageResult } from "astro";

interface StillsGridProps {
  stills: [string, GetImageResult][];
}

export const StillsGrid = ({ stills }: StillsGridProps) => {
  const $modalContents = useStore(modalContents);

  return (
    <div className="grid p-4 gap-x-4 gap-y-4 md:pt-8 md:grid-cols-2 auto-rows-max ">
      {stills.length <= 0
        ? null
        : stills
            .filter(([videoUrl]) => $modalContents?.fullVideoUrl === videoUrl)
            .map(([_, image], i) => (
              <div key={image.src} className="w-full rounded-2xl overflow-clip">
                {/* @ts-ignore */}
                <img
                  alt={`still number ${i + 1} of the project ${
                    $modalContents?.name
                  }`}
                  src={image.src}
                  srcSet={image.srcSet.attribute}
                  loading="lazy"
                />
                {/* {x.imageSrc ? (
              <Image
                alt=""
                src={myImage.src}
                width={myImage.width}
                height={myImage.height}
              />
            ) : (
              <div className="aspect-video w-full">
                <ReactPlayer
                  src={x.videoSource!}
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
            )} */}
              </div>
            ))}
    </div>
  );
};
