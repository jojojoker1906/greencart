import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#021a10] via-[#0b2d1f] to-[#157347] py-28 px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden">

      {/* Ambient Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-400/10 rounded-full blur-[180px]"></div>
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-emerald-300/10 rounded-full blur-[220px]"></div>

      {/* Decorative Rings */}
      <div className="absolute top-32 right-20 w-[700px] h-[700px] border border-white/5 rounded-full"></div>
      <div className="absolute top-48 right-36 w-[500px] h-[500px] border border-white/5 rounded-full"></div>

      <div className="relative z-10">

        {/* Header */}
        <div className="mb-20">

          <p className="uppercase tracking-[0.35em] text-green-200 text-sm font-semibold mb-5">
            Premium Collection
          </p>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
            All Products
          </h1>

          <p className="mt-5 text-green-100/75 text-lg max-w-2xl">
            Explore our curated range of organic essentials,
            fresh groceries, and sustainable everyday choices.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="w-24 h-[3px] bg-white rounded-full"></div>
            <span className="text-green-100/70 text-sm">
              {filteredProducts.filter((product) => product.inStock).length} Products Available
            </span>
          </div>

        </div>

        {/* Products */}
        {filteredProducts.filter((product) => product.inStock).length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">

            {filteredProducts
              .filter((product) => product.inStock)
              .map((product, index) => (
                <div
                  key={index}
                  className="transform hover:scale-[1.02] transition-all duration-500"
                >
                  <ProductCard product={product} />
                </div>
              ))}

          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] py-20 text-center">

            <h2 className="text-3xl font-bold text-white">
              No products found
            </h2>

            <p className="mt-3 text-green-100/70">
              Try searching with different keywords.
            </p>

          </div>
        )}

      </div>
    </section>
  );
};

export default AllProducts;