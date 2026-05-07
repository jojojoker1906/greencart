import React from "react";
import MainBanner from "../components/MainBanner";
import Categories from "../components/Categories";
import BestSeller from "../components/BestSeller";
import BottomBanner from "../components/BottomBanner";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <main className="bg-[#021a10] overflow-hidden">

      <MainBanner />

      <section className="relative -mt-2">
        <Categories />
      </section>

      <section className="relative">
        <BestSeller />
      </section>

      <section className="relative">
        <BottomBanner />
      </section>

      <section className="relative">
        <NewsLetter />
      </section>

    </main>
  );
};

export default Home;