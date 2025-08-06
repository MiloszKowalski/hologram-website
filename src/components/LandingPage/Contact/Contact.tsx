export const Contact = () => {
  return (
    <section
      id="contact"
      className="relative flex flex-col items-center text-center text-white mt-48 pb-96 2xl:pb-[40vh]"
    >
      <h1 className="text-3xl font-bold">KONTAKT</h1>
      <p className="my-16 font-[Chivo_Mono]">Zadzwoń i zróbmy coś razem!</p>
      <a href="tel:723052035">
        <h3 className="text-xl md:text-2xl my-1 font-[Chivo_Mono]">
          tel. 723 052 035
        </h3>
      </a>
      <h3 className="text-xl md:text-2xl my-1 font-[Chivo_Mono]">
        kontakt@studiohologram.pl
      </h3>

      <div className="absolute left-1/2 md:left-auto -translate-x-[50%] md:-translate-x-[0]  md:right-10 bottom-10 text-white font-[Chivo_Mono]">
        <p>Studio Hologram sp. z o.o.</p>
        <p>NIP 5273151918</p>
        <p>ul. Ogrodowa 48/54</p>
        <p>00-876 Warszawa</p>
      </div>
    </section>
  );
};
