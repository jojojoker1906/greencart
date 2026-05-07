import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");

      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-full text-white">
      {/* Header */}
      <div className="mb-8">
        <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium">
          Seller Dashboard
        </p>
        <h1 className="text-3xl font-semibold mt-2">Orders</h1>
        <p className="text-green-100/70 mt-1">
          Manage and track customer purchases
        </p>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white/8 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg hover:border-primary/40 transition"
            >
              {/* Top Row */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-green-100/60 text-sm">Order ID</p>
                  <p className="font-medium text-white break-all">
                    {order._id}
                  </p>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <span className="px-4 py-1.5 rounded-full text-sm bg-primary/20 text-primary font-medium">
                    {order.paymentType}
                  </span>

                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                      order.isPaid
                        ? "bg-green-500/20 text-green-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid lg:grid-cols-3 gap-8 mt-6">
                {/* Products */}
                <div>
                  <h3 className="font-medium text-lg mb-4 text-white">
                    Products
                  </h3>

                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-white/5 rounded-xl p-3"
                      >
                        <img
                          src={item.product.image[0]}
                          alt={item.product.name}
                          className="w-14 h-14 rounded-lg object-cover border border-white/10"
                        />

                        <div>
                          <p className="text-white font-medium">
                            {item.product.name}
                          </p>
                          <p className="text-green-100/60 text-sm">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer */}
                <div>
                  <h3 className="font-medium text-lg mb-4 text-white">
                    Customer Details
                  </h3>

                  <div className="bg-white/5 rounded-xl p-4 space-y-2 text-green-100/80">
                    <p className="font-medium text-white">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city}, {order.address.state}
                    </p>
                    <p>
                      {order.address.zipcode}, {order.address.country}
                    </p>
                    <p>{order.address.phone}</p>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h3 className="font-medium text-lg mb-4 text-white">
                    Summary
                  </h3>

                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-5">
                    <p className="text-green-100/60 text-sm">
                      Total Amount
                    </p>

                    <p className="text-4xl font-bold text-primary mt-2">
                      {currency}
                      {order.amount}
                    </p>

                    <p className="text-green-100/70 text-sm mt-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                    <button className="w-full mt-5 py-3 bg-primary text-white rounded-xl hover:bg-primary-dull transition font-medium">
                      Process Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[60vh] flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
          <img
            src={assets.box_icon}
            alt=""
            className="w-16 opacity-50"
          />

          <p className="mt-4 text-xl font-medium text-white">
            No Orders Yet
          </p>

          <p className="text-green-100/60">
            Orders will appear here once customers start buying
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;