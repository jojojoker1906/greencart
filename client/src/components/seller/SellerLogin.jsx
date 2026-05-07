import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      const { data } = await axios.post("/api/seller/login", {
        email,
        password,
      });

      if(data.success){
   setIsSeller(true);
   localStorage.setItem("isSeller", true);
   localStorage.setItem("sellerToken", data.token);
   navigate('/seller');
}else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#021a10] via-[#0a3d2a] to-[#157347] px-6 relative overflow-hidden">

        {/* Background Glow Effects */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-green-400/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-emerald-300/10 blur-[150px] rounded-full"></div>

        {/* Login Card */}
        <form
          onSubmit={onSubmitHandler}
          className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[36px] shadow-[0_20px_80px_rgba(0,0,0,0.45)] p-10 md:p-12"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <p className="uppercase tracking-[0.35em] text-green-200 text-xs font-semibold mb-4">
              Seller Dashboard
            </p>

            <h1 className="text-4xl md:text-5xl font-black text-white">
              Welcome Back
            </h1>

            <p className="text-green-100/70 mt-3">
              Login to manage products, orders & inventory
            </p>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-green-100 text-sm mb-2 font-medium">
              Email Address
            </label>

            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-green-200/50 outline-none focus:border-green-400 focus:bg-white/10 transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div className="mb-8">
            <label className="block text-green-100 text-sm mb-2 font-medium">
              Password
            </label>

            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-green-200/50 outline-none focus:border-green-400 focus:bg-white/10 transition-all duration-300"
            />
          </div>

          {/* Button */}
          <button className="w-full py-4 rounded-2xl bg-white text-green-900 font-bold text-lg hover:scale-[1.02] hover:bg-green-100 transition-all duration-300 shadow-xl cursor-pointer">
            Login to Dashboard
          </button>

          {/* Footer */}
          <p className="text-center text-green-100/60 text-sm mt-6">
            Secure seller access portal
          </p>
        </form>
      </section>
    )
  );
};

export default SellerLogin;