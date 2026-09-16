import React from "react";

export interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  discount: string;
  rating: string;
  image: string;
  deliveryTag: string;
  badge?: string;
}

export default function ProductCard({
  name,
  price,
  originalPrice,
  discount,
  rating,
  image,
  deliveryTag,
  badge,
}: ProductCardProps) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-rose-light/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Image Container with Badges */}
        <div className="relative w-full h-44 bg-blush/20 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {badge && (
            <span className="absolute top-2 left-2 bg-gold text-botanical font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
              {badge}
            </span>
          )}
          <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded">
            🚀 {deliveryTag}
          </span>
        </div>

        {/* Content Section */}
        <div className="p-3">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded">
              {rating}
            </span>
          </div>
          <h3 className="font-medium text-xs sm:text-sm text-botanical line-clamp-1">
            {name}
          </h3>
          
          {/* Price Layout */}
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-bold text-sm text-botanical">{price}</span>
            <span className="text-xs text-charcoal/40 line-through">{originalPrice}</span>
            <span className="text-[10px] font-bold text-rose">{discount}</span>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="p-3 pt-0">
        <button className="w-full py-1.5 bg-rose text-ivory rounded-lg text-xs font-semibold hover:bg-rose-dark transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
}