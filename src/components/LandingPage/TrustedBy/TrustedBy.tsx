import Marquee from "react-fast-marquee";
import EmblaCarousel from "./Carousel/EmblaCarousel";

interface ImageProps {
  src: string;
  padding?: string;
}

const Image = ({ src, padding }: ImageProps) => {
  return (
    <div className={`py-8 mt-2 h-32 mx-6 flex items-center `}>
      <img className={padding ?? "h-full"} src={src} />
    </div>
  );
};

export const TrustedBy = () => {
  return (
    <section className="mt-40 md:mt-24">
      <h2 className="text-3xl mt-0 font-bold text-white text-center">
        KLIENCI
      </h2>
      <EmblaCarousel
        slides={[
          <Image src="clients/AsusTek-black-logo.png" padding="h-3/5" />,
          <Image src="clients/baila_ella.png" padding="h-4/5" />,
          <Image src="clients/2020.png" />,
          <Image
            src="clients/Continental-logo-logotype.png"
            padding="h-[240%]"
          />,
          <Image src="clients/infakt-logo.png" padding="h-4/5" />,
          <Image src="clients/kayax.png" padding="h-[200%]" />,
          <Image src="clients/Mowi_ASA_logo.png" padding="h-1/2" />,
          <Image src="clients/netflix.png" padding="h-5/4" />,
          <Image src="clients/microsoft.png" />,
          <Image src="clients/Polsat_2021_gradient.png" padding="h-4/5" />,
          <Image src="clients/sony music.png" padding="h-3/5" />,
          <Image src="clients/TVN WB.png" padding="h-4/5" />,
          <Image src="clients/warner.png" padding="h-[130%]" />,
          <Image
            src="clients/x-kom_the_seller_logo-2048x1365.png"
            padding="h-3/5"
          />,
        ]}
        options={{
          loop: true,
          dragFree: true,
        }}
      ></EmblaCarousel>
      {/* <Marquee>
        <Image src="clients/AsusTek-black-logo.png" padding="h-3/5" />
        <Image src="clients/baila_ella.png" padding="h-4/5" />
        <Image src="clients/2020.png" />
        <Image src="clients/Continental-logo-logotype.png" padding="h-[240%]" />
        <Image src="clients/infakt-logo.png" padding="h-4/5" />
        <Image src="clients/kayax.png" padding="h-[200%]" />
        <Image src="clients/Mowi_ASA_logo.png" padding="h-1/2" />
        <Image src="clients/netflix.png" padding="h-5/4" />
        <Image src="clients/microsoft.png" />
        <Image src="clients/Polsat_2021_gradient.png" padding="h-4/5" />
        <Image src="clients/sony music.png" padding="h-3/5" />
        <Image src="clients/TVN WB.png" padding="h-4/5" />
        <Image src="clients/warner.png" padding="h-[130%]" />
        <Image
          src="clients/x-kom_the_seller_logo-2048x1365.png"
          padding="h-3/5"
        />
      </Marquee> */}
    </section>
  );
};
