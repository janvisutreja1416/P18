
function ProductCard({ product, selected, onSelect }) {
  const inStock = Number(product.stock) > 0;

  return (
    <button
      type="button"
      onClick={() => onSelect(product.id)}
      aria-pressed={selected}
      className={`product-card w-full rounded-2xl border p-4 text-left transition duration-300 hover:-translate-y-1 ${
        selected
          ? "border-violet-400 bg-violet-50/90 shadow-lg shadow-violet-100"
          : "border-white/80 bg-white/60 hover:border-violet-200 hover:bg-white/90"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${product.color} text-3xl shadow-sm`}
        >
          {product.emoji}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate font-bold text-slate-900">
              {product.name}
            </h3>

            {selected && (
              <span className="text-lg text-violet-700">✓</span>
            )}
          </div>

          <p className="mt-1 text-xs font-medium text-slate-500">
            {product.category}
          </p>

          <p className="mt-2 text-lg font-extrabold text-violet-800">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-200/70 pt-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            inStock
              ? "bg-emerald-100 text-emerald-700"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {inStock ? `${product.stock} in stock` : "Out of stock"}
        </span>

        <span className="text-xs font-semibold text-violet-700">
          {selected ? "Selected" : "Edit product →"}
        </span>
      </div>
    </button>
  );
}

export default ProductCard;
