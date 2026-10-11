
import ProductCard from "./ProductCard";

function ProductList({ products, selectedId, onSelect }) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-violet-200 bg-white/50 px-4 py-12 text-center">
        <div className="text-4xl">🔎</div>
        <h3 className="mt-3 font-bold text-slate-800">
          No products found
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Try another search or category.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          selected={selectedId === product.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default ProductList;
