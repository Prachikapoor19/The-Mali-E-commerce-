"use client";

import React, { useState } from "react";

interface Product {
  name: string;
  price: number;
}

interface PersonalizationModalProps {
  product: Product;
  onClose: () => void;
  onSave: (customText: string, fileName: string) => void;
}

export default function PersonalizationModal({ product, onClose, onSave }: PersonalizationModalProps) {
  const [customText, setCustomText] = useState("");
  const [imageName, setImageName] = useState("");

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-rose-light/30">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blush/60 flex items-center justify-center text-charcoal hover:bg-rose hover:text-white transition-colors"
        >
          ✕
        </button>

        <h3 className="font-display font-bold text-lg text-botanical mb-1">Personalise Your Gift</h3>
        <p className="text-xs text-charcoal/60 mb-4">
          Customizing: <strong className="text-botanical">{product.name}</strong> (₹{product.price})
        </p>

        <div className="space-y-4">
          {/* Photo Upload Simulation */}
          <div>
            <label className="text-xs font-bold text-botanical block mb-1">Upload High-Res Photo</label>
            <label className="border-2 border-dashed border-rose-light/60 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-blush/40 transition-colors">
              <span className="text-2xl mb-1">📸</span>
              <span className="text-xs font-semibold text-botanical">Click to upload photo</span>
              <span className="text-[10px] text-charcoal/50">Supports JPG, PNG (Max 10MB)</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setImageName(e.target.files?.[0]?.name || "")}
              />
            </label>
            {imageName && (
              <p className="text-[11px] font-bold text-emerald-600 mt-1">✓ Attached: {imageName}</p>
            )}
          </div>

          {/* Custom Engraved Text Input */}
          <div>
            <label className="text-xs font-bold text-botanical block mb-1">Custom Message / Name</label>
            <input
              type="text"
              placeholder="e.g. Happy Birthday Prachi!"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-rose-light/40 focus:outline-none focus:border-botanical font-semibold text-botanical"
            />
          </div>

          <button
            onClick={() => onSave(customText, imageName || "memory_photo.jpg")}
            className="w-full py-3 bg-botanical text-ivory text-xs font-bold rounded-xl hover:bg-botanical-light transition-colors shadow-xs"
          >
            Confirm & Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}