import React from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  const filteredProducts = products.filter(
    (product) =>
      product.category.toLowerCase() === category
  );

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#021a10] via-[#0b2d1f] to-[#157347] py-24 px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-400/10 rounded-full blur-[180px]"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-300/10 rounded-full blur-[220px]"></div>

      <div className="relative z-10">

        {/* Header */}
        {searchCategory && (
          <div className="mb-16 text-center">

            <p className="uppercase tracking-[0.35em] text-green-200 text-sm font-semibold mb-4">
              Curated Collection
            </p>

            <h1 className="text-5xl md:text-7xl font-black text-white">
              {searchCategory.text}
            </h1>

            <p className="mt-5 text-green-100/75 text-lg max-w-2xl mx-auto">
              Explore premium fresh selections in our{" "}
              {searchCategory.text.toLowerCase()} collection.
            </p>

            <div className="w-32 h-[3px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-8 rounded-full"></div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="animate-fadeInUp"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">

            <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/10 mb-8">
              <span className="text-5xl">🌿</span>
            </div>

            <h2 className="text-4xl font-black text-white">
              No Products Found
            </h2>

            <p className="mt-4 text-green-100/70 max-w-md">
              This category is currently being refreshed with
              new premium organic selections.
            </p>

          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCategory;