import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (products.length > 0 && product) {
      let productsCopy = products
        .filter((item) => product.category === item.category)
        .slice(0, 5);

      setRelatedProducts(productsCopy);
    }
  }, [products, product]);

  useEffect(() => {
    if (product?.image?.[0]) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  return (
    product && (
      <section className="relative min-h-screen bg-gradient-to-br from-[#021a10] via-[#0b2d1f] to-[#157347] py-24 px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden">

        {/* Ambient Glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-400/10 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-emerald-300/10 rounded-full blur-[220px]"></div>

        <div className="relative z-10">

          {/* Breadcrumb */}
          <p className="text-green-100/70 text-sm mb-10">
            <Link to="/">Home</Link> /{" "}
            <Link to="/products">Products</Link> /{" "}
            <Link to={`/products/${product.category.toLowerCase()}`}>
              {product.category}
            </Link>{" "}
            / <span className="text-white">{product.name}</span>
          </p>

          {/* Product Section */}
          <div className="grid md:grid-cols-2 gap-20 items-center">

            {/* Images */}
            <div className="flex gap-5">

              <div className="flex flex-col gap-4">
                {product.image.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setThumbnail(image)}
                    className={`cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 ${
                      thumbnail === image
                        ? "border-white scale-105"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-24 h-24 object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="flex-1 bg-white/10 backdrop-blur-2xl rounded-[40px] border border-white/10 p-8 flex justify-center items-center">
                <img
                  src={thumbnail}
                  alt={product.name}
                  className="max-h-[550px] object-contain hover:scale-105 transition duration-500"
                />
              </div>

            </div>

            {/* Product Info */}
            <div>

              <p className="uppercase tracking-[0.35em] text-green-200 text-sm font-semibold mb-4">
                {product.category}
              </p>

              <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-5">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <img
                      key={i}
                      src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                      alt=""
                      className="w-5"
                    />
                  ))}
                <p className="text-green-100 ml-3">(4 Reviews)</p>
              </div>

              {/* Price */}
              <div className="mt-8">
                <p className="text-green-100/60 line-through text-lg">
                  {currency}{product.price}
                </p>

                <p className="text-4xl font-black text-white mt-1">
                  {currency}{product.offerPrice}
                </p>

                <span className="text-green-100/60 text-sm">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Description */}
              <div className="mt-10">
                <p className="text-xl font-bold text-white mb-4">
                  About Product
                </p>

                <ul className="space-y-3 text-green-100/75">
                  {product.description.map((desc, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-white">•</span>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 mt-12">

                <button
                  onClick={() => addToCart(product._id)}
                  className="flex-1 py-5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white font-bold hover:bg-white/15 transition"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => {
                    addToCart(product._id);
                    navigate("/cart");
                  }}
                  className="flex-1 py-5 bg-white text-green-900 rounded-full font-black hover:scale-105 transition-all duration-300"
                >
                  Buy Now
                </button>

              </div>

            </div>
          </div>

          {/* Related Products */}
          <div className="mt-32">

            <div className="mb-14">
              <p className="uppercase tracking-[0.35em] text-green-200 text-sm font-semibold mb-4">
                You May Also Like
              </p>

              <h2 className="text-5xl font-black text-white">
                Related Products
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
              {relatedProducts
                .filter((product) => product.inStock)
                .map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
            </div>

            <button
              onClick={() => {
                navigate("/products");
                scrollTo(0, 0);
              }}
              className="mt-16 px-10 py-4 bg-white text-green-900 rounded-full font-bold hover:scale-105 transition-all"
            >
              View More
            </button>

          </div>
        </div>
      </section>
    )
  );
};

export default ProductDetails;