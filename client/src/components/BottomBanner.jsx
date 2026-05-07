import React from "react";
import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <section className="relative py-28 px-6 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-br from-[#03180f] via-[#0b2d1f] to-[#157347] overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-green-400/10 rounded-full blur-[160px]"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-emerald-300/10 rounded-full blur-[200px]"></div>

      {/* Watermark */}
      <div className="absolute inset-0 opacity-[0.04]">
        <img
          src={assets.bottom_banner_image}
          alt="watermark"
          className="w-full h-full object-cover scale-125"
        />
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT CONTENT */}
        <div>

          <p className="uppercase tracking-[0.35em] text-green-200 text-sm font-semibold mb-5">
            Why Choose Us
          </p>

          <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
            Freshness You
            <br />
            Can Trust
          </h2>

          <p className="mt-6 text-green-100/75 text-lg leading-relaxed max-w-xl">
            We deliver more than groceries. We deliver quality,
            reliability, and a seamless shopping experience
            designed around your lifestyle.
          </p>

          {/* CTA */}
          <button className="mt-10 px-8 py-4 bg-white text-green-900 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl">
            Discover More
          </button>
        </div>

        {/* FEATURES */}
        <div className="grid gap-6">

          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex items-start gap-5 hover:bg-white/15 hover:-translate-y-2 transition-all duration-500"
            >
              {/* Icon */}
              <div className="bg-white/15 p-4 rounded-2xl group-hover:scale-110 transition duration-500">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-10 h-10 object-contain"
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="text-green-100/70 mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default BottomBanner;