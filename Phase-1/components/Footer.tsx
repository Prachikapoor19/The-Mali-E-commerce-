import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-botanical text-ivory pt-10 pb-6 px-4 sm:px-6 lg:px-10 xl:px-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-botanical-light/30">
        <div>
          <h3 className="font-display text-lg font-bold text-gold mb-3">The Mali</h3>
          <p className="text-xs text-ivory/80 leading-relaxed">
            Your trusted online floral, cake, and gift destination. Delivering happiness across Lucknow and nationwide with premium quality & same-day service.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-sm text-gold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-xs text-ivory/80">
            <li><a href="#" className="hover:text-gold transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Track Order</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Corporate Gifts</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm text-gold mb-3">Customer Support</h4>
          <ul className="space-y-2 text-xs text-ivory/80">
            <li><a href="#" className="hover:text-gold transition-colors">FAQ & Help</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Refund & Return Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm text-gold mb-3">Connect With Us</h4>
          <p className="text-xs text-ivory/80 mb-3">Need assistance? Contact our support team directly.</p>
          <div className="flex gap-3 text-sm">
            <span className="bg-botanical-light/40 px-3 py-1.5 rounded text-xs">📞 Support: 1800-MALI-GIFT</span>
          </div>
        </div>
      </div>

      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/60 gap-4">
        <p>© {new Date().getFullYear()} The Mali E-commerce. All rights reserved.</p>
        <p>Designed with botanical elegance ✨</p>
      </div>
    </footer>
  );
}