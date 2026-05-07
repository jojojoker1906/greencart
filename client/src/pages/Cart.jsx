import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    user,
    setCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];

    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);

      if (product) {
        tempArray.push({
          ...product,
          quantity: cartItems[key],
        });
      }
    }

    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");

      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address");
      }

      const endpoint =
        paymentOption === "COD"
          ? "/api/order/cod"
          : "/api/order/stripe";

      const { data } = await axios.post(endpoint, {
        userId: user._id,
        items: cartArray.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        address: selectedAddress._id,
      });

      if (data.success) {
        if (paymentOption === "COD") {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          window.location.replace(data.url);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  return products.length > 0 ? (
    <section className="relative min-h-screen bg-gradient-to-br from-[#021a10] via-[#0b2d1f] to-[#157347] py-24 px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden">

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-400/10 rounded-full blur-[180px]"></div>
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-emerald-300/10 rounded-full blur-[220px]"></div>

      <div className="relative z-10">

        {/* Header */}
        <div className="mb-16">
          <p className="uppercase tracking-[0.35em] text-green-200 text-sm font-semibold mb-4">
            Checkout
          </p>

          <h1 className="text-5xl md:text-6xl font-black text-white">
            Shopping Cart
          </h1>

          <p className="mt-4 text-green-100/75">
            {getCartCount()} items selected
          </p>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-12">

          {/* Cart Items */}
          <div className="space-y-6">

            {cartArray.map((product, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 flex flex-col md:flex-row items-center gap-6"
              >
                <div
                  onClick={() => {
                    navigate(
                      `/products/${product.category.toLowerCase()}/${product._id}`
                    );
                    scrollTo(0, 0);
                  }}
                  className="cursor-pointer bg-white/10 rounded-3xl p-4"
                >
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-32 h-32 object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">
                    {product.name}
                  </h3>

                  <p className="text-green-100/70 mt-2">
                    {product.category}
                  </p>

                  <p className="text-3xl font-black text-white mt-4">
                    {currency}
                    {product.offerPrice * product.quantity}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4">

                  <select
                    value={cartItems[product._id]}
                    onChange={(e) =>
                      updateCartItem(
                        product._id,
                        Number(e.target.value)
                      )
                    }
                    className="bg-white/10 border border-white/10 rounded-full px-5 py-3 text-white outline-none"
                  >
                    {Array(9)
                      .fill("")
                      .map((_, i) => (
                        <option
                          key={i}
                          value={i + 1}
                          className="text-black"
                        >
                          {i + 1}
                        </option>
                      ))}
                  </select>

                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="text-red-300 hover:text-red-200 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

          </div>

          {/* Order Summary */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 h-fit sticky top-28">

            <h2 className="text-3xl font-black text-white mb-8">
              Order Summary
            </h2>

            {/* Address */}
            <div className="relative z-40">
              <p className="text-green-200 text-sm uppercase mb-2">
                Delivery Address
              </p>

              <p className="text-green-100/75">
                {selectedAddress
                  ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "No address selected"}
              </p>

              <button
                onClick={() => setShowAddress(!showAddress)}
                className="mt-3 text-white underline"
              >
                Change
              </button>

              {showAddress && (
                <div className="absolute top-16 left-0 w-full z-50 bg-[#0b2d1f] border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden">

                  {addresses.length > 0 ? (
                    addresses.map((address, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedAddress(address);
                          setShowAddress(false);
                        }}
                        className="p-4 text-green-100 hover:bg-white/10 cursor-pointer transition border-b border-white/5"
                      >
                        {address.street}, {address.city},{" "}
                        {address.state}, {address.country}
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-green-100/60">
                      No saved addresses
                    </div>
                  )}

                  <button
                    onClick={() => navigate("/add-address")}
                    className="w-full py-4 bg-white text-green-900 font-bold hover:bg-green-100 transition"
                  >
                    Add New Address
                  </button>

                </div>
              )}
            </div>

            {/* Payment */}
            <div className="mt-8">
              <p className="text-green-200 text-sm uppercase mb-3">
                Payment Method
              </p>

              <select
                onChange={(e) =>
                  setPaymentOption(e.target.value)
                }
                className="w-full bg-white/10 border border-white/10 rounded-full px-5 py-4 text-white outline-none"
              >
                <option value="COD" className="text-black">
                  Cash On Delivery
                </option>
                <option value="Online" className="text-black">
                  Online Payment
                </option>
              </select>
            </div>

            {/* Totals */}
            <div className="mt-10 space-y-4 text-green-100">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{currency}{getCartAmount()}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-300">Free</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>{currency}{getCartAmount() * 0.02}</span>
              </div>

              <div className="border-t border-white/10 pt-5 flex justify-between text-2xl font-black text-white">
                <span>Total</span>
                <span>
                  {currency}
                  {getCartAmount() + getCartAmount() * 0.02}
                </span>
              </div>

            </div>

            <button
              onClick={placeOrder}
              className="w-full mt-10 py-5 bg-white text-green-900 rounded-full font-black hover:scale-105 transition-all"
            >
              {paymentOption === "COD"
                ? "Place Order"
                : "Proceed to Checkout"}
            </button>

          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default Cart;