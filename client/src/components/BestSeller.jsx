import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products, navigate } = useAppContext();

  return (
    <section className="relative py-28 px-6 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-b from-[#0b2d1f] via-[#0f402b] to-[#03180f] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-green-400/10 rounded-full blur-[140px]"></div>
      <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-emerald-300/10 rounded-full blur-[180px]"></div>

      <div className="relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">

          <div>
            <p className="uppercase tracking-[0.35em] text-green-200 text-sm font-semibold mb-4">
              Customer Favorites
            </p>

            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
              Best Sellers
            </h2>

            <p className="text-green-100/70 mt-5 max-w-2xl text-lg">
              Discover the most loved products chosen by thousands
              of happy customers.
            </p>
          </div>

          <button
            onClick={() => {
              navigate("/products");
              scrollTo(0, 0);
            }}
            className="px-8 py-4 bg-white text-green-900 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl"
          >
            View All
          </button>

        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">

          {products
            .filter((product) => product.inStock)
            .slice(0, 5)
            .map((product, index) => (
              <div
                key={index}
                className="transform hover:scale-[1.02] transition-all duration-500"
              >
                <ProductCard product={product} />
              </div>
            ))}

        </div>

      </div>
    </section>
  );
};

export default BestSeller;