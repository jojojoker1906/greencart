const NewsLetter = () => {
  return (
    <section className="relative py-24 px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden bg-gradient-to-br from-[#03180f] via-[#0b2d1f] to-[#157347]">

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-green-400/10 rounded-full blur-[140px]"></div>
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-emerald-300/10 rounded-full blur-[160px]"></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
          Never Miss a Deal
        </h2>

        <p className="mt-4 text-green-100/80 text-lg leading-relaxed">
          Get exclusive offers, fresh arrivals, and weekly discounts
          delivered straight to your inbox.
        </p>

        {/* Form */}
        <div className="mt-10 flex justify-center">
          <form className="flex w-full md:w-auto bg-white/10 backdrop-blur-md rounded-full overflow-hidden border border-white/20 hover:border-white/30 transition-all duration-500 shadow-lg">

            <input
              type="email"
              placeholder="Enter your email"
              required
              className="px-6 py-4 bg-transparent outline-none min-w-[260px] md:min-w-[320px] text-white placeholder:text-green-200"
            />

            <button
              type="submit"
              className="bg-white text-green-900 px-8 font-bold hover:bg-green-100 transition-all duration-300 hover:scale-105"
            >
              Subscribe
            </button>

          </form>
        </div>

      </div>
    </section>
  );
};

export default NewsLetter;