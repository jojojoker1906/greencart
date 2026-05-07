import { assets, footerLinks } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="relative mt-32 overflow-hidden bg-gradient-to-br from-[#021a10] via-[#0b2d1f] to-[#157347]">

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-400/10 rounded-full blur-[140px]"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-300/10 rounded-full blur-[180px]"></div>

      {/* Watermark */}
      <div className="absolute inset-0 opacity-[0.04]">
        <img
          src={assets.main_banner_bg}
          alt="watermark"
          className="w-full h-full object-cover scale-125"
        />
      </div>

      <div className="relative z-10 px-6 md:px-16 lg:px-24 xl:px-32 py-24">

        {/* TOP */}
        <div className="grid md:grid-cols-3 gap-16 pb-16 border-b border-white/10">

          {/* BRAND */}
          <div>
            <img
              className="w-36 brightness-0 invert mb-8 hover:scale-105 transition duration-500"
              src={assets.logo}
              alt="logo"
            />

            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Fresh Living,
              <br />
              Elevated.
            </h2>

            <p className="mt-6 text-green-100/80 leading-relaxed max-w-sm">
              Bringing premium groceries and healthy essentials
              directly to your home with unmatched freshness.
            </p>
          </div>

          {/* LINKS */}
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-10">

            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="text-white font-bold uppercase text-sm tracking-[0.22em] mb-6">
                  {section.title}
                </h3>

                <ul className="space-y-4">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        className="text-green-100/70 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="py-14 flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10">

          <div>
            <h3 className="text-2xl font-bold text-white">
              Stay in the Loop
            </h3>

            <p className="text-green-100/70 mt-2">
              Exclusive offers, fresh arrivals, and weekly deals.
            </p>
          </div>

          <div className="flex w-full md:w-auto bg-white/10 backdrop-blur-md rounded-full overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500">

            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 bg-transparent outline-none min-w-[280px] text-white placeholder:text-green-200"
            />

            <button className="bg-white text-green-900 px-8 font-bold hover:bg-green-100 transition-all duration-300 hover:scale-105">
              Join
            </button>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-green-100/60">

          <p>
            © {new Date().getFullYear()} GreenCart. All rights reserved.
          </p>

          <div className="flex gap-8">
            {["Privacy", "Terms", "Support"].map((item, i) => (
              <span
                key={i}
                className="cursor-pointer hover:text-white transition duration-300 hover:-translate-y-1"
              >
                {item}
              </span>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;