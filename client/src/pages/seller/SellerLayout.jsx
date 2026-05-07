import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { axios, navigate } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");

      if (data.success) {
        toast.success(data.message);
        
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03180f] via-[#0a2b1c] to-[#157347] flex text-white">

      {/* SIDEBAR */}
      <aside className="w-20 md:w-72 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col">

        {/* Logo */}
        <div className="px-6 py-7 border-b border-white/10">
          <Link to="/">
            <img
              src={assets.logo}
              alt="logo"
              className="w-32 hidden md:block brightness-0 invert"
            />
          </Link>
        </div>

        {/* Nav */}
        <div className="flex-1 px-4 py-8 space-y-3">
          {sidebarLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300
                ${
                  isActive
                    ? "bg-white text-green-900 shadow-xl"
                    : "text-green-100/80 hover:bg-white/10"
                }`
              }
            >
              <img
                src={item.icon}
                alt={item.name}
                className="w-6 h-6"
              />

              <span className="hidden md:block font-medium">
                {item.name}
              </span>
            </NavLink>
          ))}
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full py-3 rounded-2xl bg-white text-green-900 font-semibold hover:bg-green-100 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="h-20 px-8 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur-xl">

          <div>
            <p className="text-green-200/70 text-sm uppercase tracking-[0.2em]">
              Seller Panel
            </p>
            <h1 className="text-2xl font-bold">
              GreenCart Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-green-100/60 text-sm">
                Welcome back
              </p>
              <p className="font-semibold">Admin</p>
            </div>

            <div className="w-11 h-11 rounded-full bg-white text-green-900 flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-8 overflow-y-auto">

          <div className="bg-white/8 backdrop-blur-xl border border-white/10 rounded-[28px] min-h-full p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
            <Outlet />
          </div>

        </main>
      </div>
    </div>
  );
};

export default SellerLayout;