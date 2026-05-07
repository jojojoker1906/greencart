import React from "react";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#021a10] via-[#0a4d31] to-[#34a853] flex items-center">

      {/* Ambient Glow */}
      <div className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] bg-green-500/20 rounded-full blur-[180px] animate-pulse"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[900px] h-[900px] bg-emerald-300/15 rounded-full blur-[220px]"></div>

      {/* Radial Rings */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2">
        <div className="w-[850px] h-[850px] border border-white/5 rounded-full"></div>
      </div>
      <div className="absolute right-28 top-1/2 -translate-y-1/2">
        <div className="w-[650px] h-[650px] border border-white/5 rounded-full"></div>
      </div>
      <div className="absolute right-48 top-1/2 -translate-y-1/2">
        <div className="w-[450px] h-[450px] border border-white/5 rounded-full"></div>
      </div>

      {/* Floating Organic Shapes */}
      <div className="absolute top-32 right-40 w-44 h-44 bg-white/10 rounded-[40%] rotate-12 backdrop-blur-xl animate-bounce"></div>

      <div className="absolute bottom-40 right-64 w-28 h-28 bg-green-200/20 rounded-full backdrop-blur-md"></div>

      <div className="absolute top-1/3 right-20 w-20 h-20 bg-white/15 rounded-2xl rotate-45"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-8 md:px-20 lg:px-28 xl:px-36 grid md:grid-cols-2 items-center gap-16">

        {/* LEFT CONTENT */}
        <div>

          <p className="uppercase tracking-[0.45em] text-green-200 text-sm font-semibold mb-8">
            Organic • Sustainable • Premium
          </p>

          <h1 className="text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] font-black text-white leading-[0.82] tracking-tight">
            LIVE
            <br />
            GREEN
          </h1>

          <p className="mt-8 text-green-100 text-lg md:text-xl max-w-xl leading-relaxed">
            Experience freshness redefined. Premium groceries,
            organic essentials, and mindful shopping crafted
            for modern living.
          </p>

          <div className="flex flex-wrap gap-5 mt-12">

            <Link
              to="/products"
              className="px-10 py-5 bg-white text-green-900 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Shop Now
            </Link>

            <Link
              to="/products"
              className="px-10 py-5 border border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
            >
              Explore
            </Link>

          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative flex justify-center items-center h-[700px]">

          <div className="absolute w-[520px] h-[520px] bg-white/10 backdrop-blur-3xl rounded-full border border-white/10"></div>

          <div className="absolute w-[350px] h-[350px] bg-green-100/10 rounded-[38%] rotate-12 backdrop-blur-2xl animate-pulse"></div>

          <div className="absolute w-[220px] h-[220px] bg-white/15 rounded-full backdrop-blur-xl"></div>

          <div className="text-center z-20">
            <h2 className="text-white text-6xl md:text-7xl font-black tracking-tight">
              PURE
            </h2>
            <p className="text-green-100 mt-4 text-xl tracking-[0.25em] uppercase">
              Freshness
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#021a10] to-transparent"></div>
    </section>
  );
};

export default MainBanner;