import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#021a10] via-[#0a4d31] to-[#34a853] flex items-center">

      {/* Watermark Background */}
      <div className="absolute inset-0 opacity-[0.08]">
        <img
          src={assets.main_banner_bg}
          alt="watermark"
          className="w-full h-full object-cover scale-125 blur-[2px]"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#021a10]/95 via-[#0a4d31]/80 to-transparent"></div>

      {/* Decorative Glows */}
      <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-green-400/20 rounded-full blur-[180px]"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-300/20 rounded-full blur-[160px]"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-8 md:px-20 lg:px-28 xl:px-36 grid md:grid-cols-2 items-center gap-12">

        {/* LEFT */}
        <div>

          <p className="uppercase tracking-[0.45em] text-green-200 text-sm font-semibold mb-8">
            Premium Organic Grocery
          </p>

          <h1 className="text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] font-black text-white leading-[0.82] tracking-tight drop-shadow-2xl">
            LIVE
            <br />
            GREEN
          </h1>

          <p className="mt-8 text-green-100 text-lg md:text-xl max-w-xl leading-relaxed">
            Experience freshness redefined. Discover handpicked groceries,
            healthy essentials, and premium quality delivered with care.
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
              className="px-10 py-5 border border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition"
            >
              Explore
            </Link>

          </div>
        </div>

        {/* RIGHT HERO IMAGE */}
        <div className="relative flex justify-center items-center">

          {/* Glow Ring */}
          <div className="absolute w-[700px] h-[700px] border border-white/10 rounded-full"></div>
          <div className="absolute w-[550px] h-[550px] border border-white/10 rounded-full"></div>

          <img
            src={assets.main_banner_bg}
            alt="banner"
            className="relative z-10 max-h-[92vh] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
          />

        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#021a10] to-transparent"></div>
    </section>
  );
};

export default MainBanner;