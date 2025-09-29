import { Bio } from "./Bio/Bio";

export const About = () => {
  return (
    <section id="about" className="mt-36">
      <h1 className="text-4xl text-center text-white font-bold">O NAS</h1>
      <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-28 pb-48 mt-16">
        <Bio
          name={`TOMEK\nWILCZYŃSKI`}
          description={`Reżyser fabularno-reklamowy nagradzanych produkcji. Jego film “Dziewczyna z walizką” został zaprezentowany na 77. Festiwalu Filmowym w Cannes. Laureat nagrody Grand Video Awards za performance #MATA2040 i dwukrotny zwycięzca 48 Hour Film Project. Nominowany do nagrody KTR za głośną kampanię “Nie widzę przeszkód” o niewidomych. Pomysłodawca i założyciel Studio Hologram.`}
          imgSrc="wilku.png"
        />
        <div className="relative top-24">
          <Bio
            name={`AGATA\nZAMĘCKA-PIECHAL`}
            description={`Producentka, która zmienia pomysły w rzeczywistość. Postawi każdy plan - od prostych nagrań po wysokobudżetowe reklamy. Współpracowała z czołowymi markami i agencjami. Jej bogate portfolio obejmuje szeroki zakres projektów, od teledysków po międzynarodowe produkcje. Wcześniej dziennikarka telewizyjna stacji TVN. Absolwentka UAM na kierunku nowe media.`}
            imgSrc="agata.jpeg"
            left="left-8"
          />
        </div>
      </div>
    </section>
  );
};
