import React, { useEffect, useRef } from "react";
import type { EmblaOptionsType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";

type PropType = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({
      playOnInit: true,
      stopOnInteraction: false,
      speed: 1.5,
      stopOnFocusIn: false,
      stopOnMouseEnter: false,
      startDelay: 0,
    }),
  ]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={wrapperRef}
      onPointerMove={(e) => e.preventDefault()}
      className="embla"
      dir="ltr"
    >
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((el, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">{el}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
