const NewsLetter = () => {
  return (
    <section className="relative py-32 px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden bg-gradient-to-br from-[#021a10] via-[#0b2d1f] to-[#157347]">

      {/* Background Glow */}
      <div className="absolute top-10 left-20 w-96 h-96 bg-green-400/10 rounded-full blur-[180px]"></div>
      <div className="absolute bottom-10 right-20 w-[500px] h-[500px] bg-emerald-300/10 rounded-full blur-[220px]"></div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:28px_28px]"></div>

      <div className="relative z-10 max-w-5xl mx-auto">

        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 md:p-16 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">

          <div className="text-center">

            {/* Label */}
            <p className="uppercase tracking-[0.35em] text-green-200 text-sm font-semibold mb-6">
              Stay Connected
            </p>

            {/* Heading */}
            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
              Fresh Deals,
              <br />
              Straight to You
            </h2>

            {/* Text */}
            <p className="mt-6 text-green-100/75 text-lg max-w-2xl mx-auto leading-relaxed">
              Subscribe for exclusive offers, seasonal discounts,
              and premium grocery updates curated for smarter shopping.
            </p>

            {/* Form */}
            <div className="mt-12 flex justify-center">
              <form className="flex flex-col md:flex-row w-full max-w-2xl bg-white/10 border border-white/10 rounded-full overflow-hidden hover:border-white/20 transition-all duration-500">

                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-8 py-5 bg-transparent outline-none text-white placeholder:text-green-200"
                />

                <button
                  type="submit"
                  className="bg-white text-green-900 px-10 py-5 font-bold hover:bg-green-100 transition-all duration-300 hover:scale-105"
                >
                  Subscribe
                </button>

              </form>
            </div>

            {/* Mini Trust Text */}
            <p className="mt-5 text-green-100/50 text-sm">
              No spam. Just fresh updates and exclusive offers.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};

export default NewsLetter;