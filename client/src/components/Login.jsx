import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate } =
    useAppContext();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      const { data } = await axios.post(
        `/api/user/${state}`,
        {
          name,
          email,
          password,
        }
      );

      if (data.success) {
        navigate("/");
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
   localStorage.setItem("token", data.token);
        setShowUserLogin(false);
        toast.success(
          state === "login"
            ? "Welcome back!"
            : "Account created successfully"
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-xl px-6"
    >
      {/* Ambient Glow */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-green-400/10 rounded-full blur-[140px]"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-300/10 rounded-full blur-[160px]"></div>

      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[36px] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)] animate-fadeIn"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setShowUserLogin(false)}
          className="absolute top-5 right-5 text-white/60 hover:text-white text-xl transition"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <p className="uppercase tracking-[0.35em] text-green-200 text-xs font-semibold mb-4">
            GreenCart Access
          </p>

          <h2 className="text-4xl font-black text-white">
            {state === "login"
              ? "Welcome Back"
              : "Create Account"}
          </h2>

          <p className="mt-3 text-green-100/70">
            {state === "login"
              ? "Login to continue your fresh shopping journey."
              : "Join GreenCart and shop naturally better."}
          </p>
        </div>

        {/* Name */}
        {state === "register" && (
          <div className="mb-5">
            <label className="text-green-100 text-sm mb-2 block">
              Full Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
              className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-green-200/50 outline-none focus:border-green-300 transition"
              type="text"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <label className="text-green-100 text-sm mb-2 block">
            Email Address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-green-200/50 outline-none focus:border-green-300 transition"
            type="email"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-green-100 text-sm mb-2 block">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-green-200/50 outline-none focus:border-green-300 transition"
            type="password"
            required
          />
        </div>

        {/* Switch */}
        <p className="text-green-100/70 text-sm text-center mb-7">
          {state === "register"
            ? "Already have an account?"
            : "New to GreenCart?"}{" "}
          <span
            onClick={() =>
              setState(
                state === "login"
                  ? "register"
                  : "login"
              )
            }
            className="text-white font-semibold cursor-pointer hover:text-green-200 transition"
          >
            {state === "register"
              ? "Login"
              : "Create Account"}
          </span>
        </p>

        {/* Button */}
        <button className="w-full py-4 rounded-full bg-white text-green-900 font-black text-lg hover:scale-[1.03] transition-all duration-300 shadow-xl">
          {state === "register"
            ? "Create Account"
            : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;