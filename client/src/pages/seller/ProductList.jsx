import React from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ProductList = () => {
  const { products, currency, axios, fetchProducts } = useAppContext();

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", {
        id,
        inStock,
      });

      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Product List
        </h1>
        <p className="text-green-100/60 text-sm mt-1">
          Manage your store inventory
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">

        {/* Table Header */}
        <div className="grid grid-cols-4 px-6 py-5 border-b border-white/10 text-green-100 text-sm font-semibold uppercase tracking-wide">
          <p>Product</p>
          <p>Category</p>
          <p>Price</p>
          <p className="text-center">Stock</p>
        </div>

        {/* Products */}
        <div className="divide-y divide-white/5 max-h-[70vh] overflow-y-auto">
          {products.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-4 items-center px-6 py-5 hover:bg-white/5 transition-all duration-300"
            >
              {/* Product */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/10 border border-white/10">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <p className="text-white font-medium line-clamp-1">
                    {product.name}
                  </p>
                </div>
              </div>

              {/* Category */}
              <p className="text-green-100/80 font-medium">
                {product.category}
              </p>

              {/* Price */}
              <p className="text-white font-semibold">
                {currency}
                {product.offerPrice}
              </p>

              {/* Toggle */}
              <div className="flex justify-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={product.inStock}
                    onChange={() =>
                      toggleStock(product._id, !product.inStock)
                    }
                    className="sr-only peer"
                  />

                  <div className="w-14 h-8 bg-white/10 rounded-full peer peer-checked:bg-green-500 transition-all duration-300"></div>

                  <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
                </label>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductList;