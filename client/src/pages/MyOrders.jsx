import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);

  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");

      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#021a10] via-[#0b2d1f] to-[#157347] py-24 px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden">

      {/* Ambient Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-400/10 rounded-full blur-[180px]"></div>
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-emerald-300/10 rounded-full blur-[220px]"></div>

      <div className="relative z-10">

        {/* Header */}
        <div className="mb-16 text-center">

          <p className="uppercase tracking-[0.35em] text-green-200 text-sm font-semibold mb-4">
            Purchase History
          </p>

          <h1 className="text-5xl md:text-7xl font-black text-white">
            My Orders
          </h1>

          <p className="mt-5 text-green-100/70 text-lg">
            Track your recent purchases and delivery updates
          </p>

        </div>

        {/* Orders */}
        {myOrders.length > 0 ? (
          <div className="space-y-10">

            {myOrders.map((order, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[36px] p-8 shadow-[0_15px_60px_rgba(0,0,0,0.35)]"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">

                  <div>
                    <p className="text-green-200 text-sm uppercase tracking-wider">
                      Order ID
                    </p>
                    <p className="text-white font-semibold">
                      {order._id}
                    </p>
                  </div>

                  <div>
                    <p className="text-green-200 text-sm uppercase tracking-wider">
                      Payment
                    </p>
                    <p className="text-white">
                      {order.paymentType}
                    </p>
                  </div>

                  <div>
                    <p className="text-green-200 text-sm uppercase tracking-wider">
                      Total
                    </p>
                    <p className="text-2xl font-black text-white">
                      {currency}
                      {order.amount}
                    </p>
                  </div>

                  <div>
                    <span className="px-5 py-2 rounded-full bg-green-400/20 text-green-200 font-semibold text-sm">
                      {order.status}
                    </span>
                  </div>

                </div>

                {/* Products */}
                <div className="mt-8 space-y-6">

                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5 rounded-3xl p-5 border border-white/5"
                    >
                      <div className="flex items-center gap-5">

                        <div className="bg-white/10 p-4 rounded-3xl">
                          <img
                            src={item.product.image[0]}
                            alt={item.product.name}
                            className="w-24 h-24 object-contain"
                          />
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {item.product.name}
                          </h3>

                          <p className="text-green-100/70 mt-1">
                            {item.product.category}
                          </p>

                          <p className="text-green-200 text-sm mt-2">
                            Qty: {item.quantity || 1}
                          </p>
                        </div>

                      </div>

                      <div className="text-center md:text-right">

                        <p className="text-green-100/70 text-sm">
                          Ordered On
                        </p>

                        <p className="text-white font-medium">
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}
                        </p>

                        <p className="text-2xl font-black text-white mt-3">
                          {currency}
                          {item.product.offerPrice *
                            item.quantity}
                        </p>

                      </div>
                    </div>
                  ))}

                </div>
              </div>
            ))}

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">

            <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/10 mb-8">
              <span className="text-5xl">📦</span>
            </div>

            <h2 className="text-4xl font-black text-white">
              No Orders Yet
            </h2>

            <p className="mt-4 text-green-100/70 max-w-md">
              Looks like your fresh shopping journey
              hasn't started yet.
            </p>

          </div>
        )}

      </div>
    </section>
  );
};

export default MyOrders;