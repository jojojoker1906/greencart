import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const {
    currency,
    addToCart,
    removeFromCart,
    cartItems,
    navigate,
  } = useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
          scrollTo(0, 0);
        }}
        className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 min-w-64 max-w-64 border border-green-100"
      >
        {/* Product Image */}
        <div className="relative bg-gradient-to-br from-green-50 to-emerald-100 h-60 flex items-center justify-center overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-t from-green-100/40 to-transparent"></div>

          <img
            className="relative z-10 max-h-44 object-contain group-hover:scale-110 transition-transform duration-500"
            src={product.image[0]}
            alt={product.name}
          />
        </div>

        {/* Content */}
        <div className="p-5">

          {/* Category */}
          <p className="uppercase text-xs tracking-[0.2em] text-green-700 font-semibold">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="text-gray-900 font-bold text-lg mt-2 truncate">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-3">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="w-4"
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                />
              ))}

            <span className="text-gray-500 text-sm ml-2">(4.0)</span>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-end justify-between">

            <div>
              <p className="text-2xl font-black text-green-900">
                {currency}
                {product.offerPrice}
              </p>

              <p className="text-gray-400 line-through text-sm">
                {currency}
                {product.price}
              </p>
            </div>

            {/* Cart Controls */}
            <div onClick={(e) => e.stopPropagation()}>
              {!cartItems[product._id] ? (
                <button
                  onClick={() => addToCart(product._id)}
                  className="px-5 py-2.5 bg-green-900 text-white rounded-full font-semibold hover:bg-green-800 transition-all duration-300"
                >
                  Add
                </button>
              ) : (
                <div className="flex items-center gap-4 bg-green-100 px-4 py-2.5 rounded-full">

                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="text-green-900 font-bold text-lg"
                  >
                    −
                  </button>

                  <span className="font-semibold text-green-900">
                    {cartItems[product._id]}
                  </span>

                  <button
                    onClick={() => addToCart(product._id)}
                    className="text-green-900 font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;