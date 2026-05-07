import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <section className="relative py-24 px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden bg-gradient-to-b from-[#03180f] via-[#0a2d1f] to-[#0f4d32]">

      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-green-400/10 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-300/10 blur-[160px] rounded-full"></div>

      <div className="relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.35em] text-green-200 text-sm font-semibold mb-5">
            Explore Fresh Choices
          </p>

          <h2 className="text-5xl md:text-6xl font-black text-white">
            Shop by Category
          </h2>

          <p className="text-green-100/70 mt-5 max-w-2xl mx-auto text-lg">
            Discover premium products across every category,
            curated for freshness and quality.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">

          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/products/${category.path.toLowerCase()}`);
                scrollTo(0, 0);
              }}
              className="group relative cursor-pointer rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 p-6 flex flex-col items-center justify-center hover:bg-white/15 hover:scale-105 hover:-translate-y-3 transition-all duration-500 shadow-xl"
            >
              {/* Glow on Hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-300/0 to-emerald-400/0 group-hover:from-green-300/10 group-hover:to-emerald-400/10 transition-all duration-500"></div>

              <img
                src={category.image}
                alt={category.text}
                className="relative z-10 w-24 h-24 object-contain group-hover:scale-125 group-hover:rotate-6 transition-all duration-500"
              />

              <p className="relative z-10 mt-5 text-white font-semibold text-center text-sm md:text-base tracking-wide">
                {category.text}
              </p>

              {/* Animated underline */}
              <div className="relative z-10 mt-3 w-0 h-[2px] bg-emerald-300 group-hover:w-12 transition-all duration-500"></div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Categories;