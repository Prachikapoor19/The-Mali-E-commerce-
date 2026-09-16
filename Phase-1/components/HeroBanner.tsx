// components/HeroBanner.tsx
import React from "react";

export default function HeroBanner() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-2">
      <div className="w-full h-44 sm:h-56 md:h-64 rounded-2xl bg-gradient-to-r from-botanical to-botanical-light text-ivory p-6 md:p-10 flex items-center justify-between relative overflow-hidden shadow-sm">
        <div className="max-w-md z-10">
          <span className="bg-gold text-botanical font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full">
            Same-Day Delivery
          </span>
          <h1 className="font-display text-xl sm:text-3xl font-bold mt-2 leading-tight">
            Forgot a Date? <br />We Have You Covered
          </h1>
          <p className="text-xs sm:text-sm text-ivory/80 mt-1">
            Order before 6 PM for guaranteed delivery today in 200+ cities.
          </p>
          <button className="mt-4 px-5 py-2 bg-rose text-ivory text-xs font-semibold rounded-lg hover:bg-rose-dark transition-colors shadow-xs">
            Order Now &rarr;
          </button>
        </div>
        <div className="hidden sm:block w-48 h-48 rounded-full bg-ivory/10 border border-ivory/20 relative overflow-hidden shrink-0">
          <img
            src="https://images.pexels.com/photos/56866/rose-rose-blooms-roses-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Hero Flower"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}