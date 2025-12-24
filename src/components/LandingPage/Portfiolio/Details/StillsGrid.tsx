import { modalContents } from "../../store/animationStore";
import { useStore } from "@nanostores/react";
import type { GetImageResult } from "astro";

interface StillsGridProps {
  imageData: [[string, GetImageResult]?];
}

export const StillsGrid = ({ imageData }: StillsGridProps) => {
  const $modalContents = useStore(modalContents);

  const projectDirectory = $modalContents?.thumbSrc;

  const glob = `/src/assets/projects/${projectDirectory}`;

  return (
    <div className="grid p-4 gap-x-4 gap-y-4 md:pt-8 md:grid-cols-2 auto-rows-max ">
      {imageData.length <= 0
        ? null
        : (imageData as [[string, GetImageResult]])
            .filter(([path]) => path.startsWith(glob))
            .map(([path, image], i) => (
              <div key={path} className="w-full rounded-2xl overflow-clip">
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
