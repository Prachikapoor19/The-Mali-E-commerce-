// components/Footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-botanical text-ivory pt-10 pb-6 px-4 sm:px-6 lg:px-10 xl:px-14">
      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-8 border-b border-botanical-light/30 text-center text-xs">
        <div className="p-3 bg-botanical-light/20 rounded-lg">⭐ <strong>4.8 Star Rating</strong> across 10k+ reviews</div>
        <div className="p-3 bg-botanical-light/20 rounded-lg">⚡ <strong>30-60 Min</strong> Express Delivery</div>
        <div className="p-3 bg-botanical-light/20 rounded-lg">🔒 <strong>100% Safe</strong> & Secure Payments</div>
      </div>

      {/* Links Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-b border-botanical-light/30 text-xs">
        <div>
          <h3 className="font-display text-base font-bold text-gold mb-3">The Mali</h3>
          <p className="text-ivory/80 leading-relaxed">
            Your premier online floral, cake, and gift destination. Delivering happiness across Lucknow and nationwide.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-gold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-ivory/80">
            <li><a href="#" className="hover:text-gold transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Track Order</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Corporate Gifts</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gold mb-3">Customer Support</h4>
          <ul className="space-y-2 text-ivory/80">
            <li><a href="#" className="hover:text-gold transition-colors">FAQ & Help</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Refund & Return Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gold mb-3">Connect With Us</h4>
          <p className="text-ivory/80 mb-3">Need assistance? Contact support team.</p>
          <span className="bg-botanical-light/40 px-3 py-1.5 rounded text-xs block w-fit">📞 Support: 1800-MALI-GIFT</span>
        </div>
      </div>

      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/60 gap-4">
        <p>© {new Date().getFullYear()} The Mali E-commerce. All rights reserved.</p>
        <p>Designed with botanical elegance ✨</p>
      </div>
    </footer>
  );
}