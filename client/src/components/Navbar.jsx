// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   const {
//     user,
//     setUser,
//     setShowUserLogin,
//     navigate,
//     setSearchQuery,
//     searchQuery,
//     getCartCount,
//     axios,
//   } = useAppContext();

//   const logout = async () => {
//     try {
//       const { data } = await axios.get("/api/user/logout");
//       if (data.success) {
//         toast.success(data.message);
//         localStorage.removeItem("user");
// localStorage.removeItem("token");
// setUser(null);
//         navigate("/");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (searchQuery.length > 0) navigate("/products");
//   }, [searchQuery]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 40);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinkStyle = ({ isActive }) =>
//     `relative px-5 py-2 text-sm uppercase tracking-[0.18em] font-semibold transition-all duration-500 group
//     ${isActive ? "text-white" : "text-green-100 hover:text-white"}`;

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full z-50 px-6 md:px-16 lg:px-24 xl:px-32 transition-all duration-500
//       ${scrolled ? "py-3" : "py-6"}`}
//     >
//       <div
//         className={`flex items-center justify-between rounded-full border border-white/10 backdrop-blur-xl transition-all duration-500
//         ${
//           scrolled
//             ? "bg-[#071b12]/95 shadow-2xl px-8 py-3 scale-[0.98]"
//             : "bg-white/10 px-8 py-4"
//         }`}
//       >
//         {/* LOGO */}
//         <NavLink to="/" onClick={() => setOpen(false)}>
//           <img
//             className="h-10 brightness-0 invert hover:scale-110 transition-transform duration-500"
//             src={assets.logo}
//             alt="logo"
//           />
//         </NavLink>

//         {/* DESKTOP NAV */}
//         <div className="hidden md:flex items-center gap-8">
//           {["/", "/products", "/"].map((path, i) => {
//             const labels = ["Home", "Products", "Contact"];
//             return (
//               <NavLink key={i} to={path} className={navLinkStyle}>
//                 {labels[i]}
//                 <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-emerald-300 group-hover:w-full transition-all duration-500"></span>
//               </NavLink>
//             );
//           })}
//         </div>

//         {/* RIGHT */}
//         <div className="hidden md:flex items-center gap-5">

//           {/* SEARCH */}
//           <div className="hidden lg:flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/10 px-5 py-3 rounded-full w-72 transition-all duration-500 hover:scale-105">

//             <input
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full bg-transparent outline-none text-sm text-white placeholder:text-green-200"
//               type="text"
//               placeholder="Search..."
//             />

//             <img
//               src={assets.search_icon}
//               alt="search"
//               className="w-4 h-4 brightness-0 invert hover:rotate-12 transition"
//             />
//           </div>

//           {/* CART */}
//           <div
//             onClick={() => navigate("/cart")}
//             className="relative cursor-pointer p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-500 hover:scale-110 hover:-translate-y-1"
//           >
//             <img
//               src={assets.nav_cart_icon}
//               alt="cart"
//               className="w-5 brightness-0 invert"
//             />

//             <span className="absolute -top-1 -right-1 bg-emerald-400 text-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce">
//               {getCartCount()}
//             </span>
//           </div>

//           {/* LOGIN */}
//           {!user ? (
//             <button
//               onClick={() => setShowUserLogin(true)}
//               className="px-8 py-3 bg-white text-green-900 rounded-full font-bold hover:scale-110 hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] transition-all duration-500"
//             >
//               Login
//             </button>
//           ) : (
//             <div className="relative group">
//               <img
//                 src={assets.profile_icon}
//                 className="w-11 p-2 rounded-full bg-white/10 cursor-pointer hover:rotate-6 hover:scale-110 transition-all duration-500"
//                 alt=""
//               />

//               <ul className="hidden group-hover:block absolute top-14 right-0 bg-[#0b2d1f]/95 backdrop-blur-xl border border-white/10 rounded-2xl py-3 w-48 shadow-2xl animate-[fadeIn_.35s_ease]">

//                 <li
//                   onClick={() => navigate("/my-orders")}
//                   className="px-5 py-3 text-green-100 hover:bg-white/10 transition"
//                 >
//                   My Orders
//                 </li>

//                 <li
//                   onClick={logout}
//                   className="px-5 py-3 text-green-100 hover:bg-white/10 transition"
//                 >
//                   Logout
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* MOBILE */}
//         <div className="flex md:hidden items-center gap-4">
//           <button onClick={() => setOpen(!open)}>
//             <img
//               src={assets.menu_icon}
//               alt="menu"
//               className={`w-7 brightness-0 invert transition-transform duration-500 ${
//                 open ? "rotate-90" : ""
//               }`}
//             />
//           </button>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       {open && (
//         <div className="md:hidden mt-4 bg-[#0b2d1f]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-5 animate-[slideDown_.4s_ease]">
//           <NavLink to="/" onClick={() => setOpen(false)} className="text-white">
//             Home
//           </NavLink>
//           <NavLink to="/products" onClick={() => setOpen(false)} className="text-white">
//             Products
//           </NavLink>

//           <button
//             onClick={() => {
//               setOpen(false);
//               !user ? setShowUserLogin(true) : logout();
//             }}
//             className="bg-white text-green-900 py-3 rounded-full font-bold"
//           >
//             {!user ? "Login" : "Logout"}
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) navigate("/products");
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkStyle = ({ isActive }) =>
    `relative px-5 py-2 text-sm uppercase tracking-[0.18em] font-semibold transition-all duration-500 group
    ${isActive ? "text-white" : "text-green-100 hover:text-white"}`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-16 lg:px-24 xl:px-32 transition-all duration-500
      ${scrolled ? "py-3" : "py-6"}`}
    >
      <div
        className={`flex items-center justify-between rounded-full border border-white/10 backdrop-blur-xl transition-all duration-500
        ${
          scrolled
            ? "bg-[#071b12]/95 shadow-2xl px-8 py-3 scale-[0.98]"
            : "bg-white/10 px-8 py-4"
        }`}
      >
        {/* LOGO */}
        <NavLink to="/" onClick={() => setOpen(false)}>
          <img
            className="h-10 brightness-0 invert hover:scale-110 transition-transform duration-500"
            src={assets.logo}
            alt="logo"
          />
        </NavLink>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {["/", "/products", "/"].map((path, i) => {
            const labels = ["Home", "Products", "Contact"];
            return (
              <NavLink key={i} to={path} className={navLinkStyle}>
                {labels[i]}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-emerald-300 group-hover:w-full transition-all duration-500"></span>
              </NavLink>
            );
          })}
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-5">

          {/* SEARCH */}
          <div className="hidden lg:flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/10 px-5 py-3 rounded-full w-72 transition-all duration-500 hover:scale-105">

            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none text-sm text-white placeholder:text-green-200"
              type="text"
              placeholder="Search..."
            />

            <img
              src={assets.search_icon}
              alt="search"
              className="w-4 h-4 brightness-0 invert hover:rotate-12 transition"
            />
          </div>

          {/* CART */}
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-500 hover:scale-110 hover:-translate-y-1"
          >
            <img
              src={assets.nav_cart_icon}
              alt="cart"
              className="w-5 brightness-0 invert"
            />

            <span className="absolute -top-1 -right-1 bg-emerald-400 text-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce">
              {getCartCount()}
            </span>
          </div>

          {/* LOGIN */}
          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="px-8 py-3 bg-white text-green-900 rounded-full font-bold hover:scale-110 hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] transition-all duration-500"
            >
              Login
            </button>
          ) : (
            <div className="relative group py-2">
              <img
                src={assets.profile_icon}
                className="w-11 p-2 rounded-full bg-white/10 cursor-pointer hover:rotate-6 hover:scale-110 transition-all duration-500"
                alt=""
              />

              <ul
                className="absolute top-14 right-0 bg-[#0b2d1f]/95 backdrop-blur-xl border border-white/10 rounded-2xl py-3 w-48 shadow-2xl
                opacity-0 invisible group-hover:opacity-100 group-hover:visible
                transition-all duration-200"
              >
                <li
                  onClick={() => navigate("/my-orders")}
                  className="px-5 py-3 text-green-100 hover:bg-white/10 transition"
                >
                  My Orders
                </li>

                <li
                  onClick={logout}
                  className="px-5 py-3 text-green-100 hover:bg-white/10 transition"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* MOBILE */}
        <div className="flex md:hidden items-center gap-4">
          <button onClick={() => setOpen(!open)}>
            <img
              src={assets.menu_icon}
              alt="menu"
              className={`w-7 brightness-0 invert transition-transform duration-500 ${
                open ? "rotate-90" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden mt-4 bg-[#0b2d1f]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-5 animate-[slideDown_.4s_ease]">
          <NavLink to="/" onClick={() => setOpen(false)} className="text-white">
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)} className="text-white">
            Products
          </NavLink>

          <button
            onClick={() => {
              setOpen(false);
              !user ? setShowUserLogin(true) : logout();
            }}
            className="bg-white text-green-900 py-3 rounded-full font-bold"
          >
            {!user ? "Login" : "Logout"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;