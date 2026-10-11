
import { useState } from "react";
import ProductList from "./Components/ProductList";
import ProductForm from "./Components/ProductForm";

const initialProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    category: "Electronics",
    stock: 25,
    description: "Premium sound with comfortable wireless listening.",
    emoji: "🎧",
    color: "from-violet-200 to-indigo-100",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 3999,
    category: "Electronics",
    stock: 18,
    description: "Track your fitness, activity and daily goals.",
    emoji: "⌚",
    color: "from-sky-200 to-cyan-100",
  },
  {
    id: 3,
    name: "Classic Backpack",
    price: 1299,
    category: "Accessories",
    stock: 32,
    description: "A stylish everyday backpack with extra storage.",
    emoji: "🎒",
    color: "from-amber-200 to-orange-100",
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 2799,
    category: "Fashion",
    stock: 12,
    description: "Lightweight shoes designed for daily movement.",
    emoji: "👟",
    color: "from-pink-200 to-rose-100",
  },
  {
    id: 5,
    name: "Coffee Mug",
    price: 399,
    category: "Home",
    stock: 40,
    description: "A beautiful ceramic mug for your favourite drink.",
    emoji: "☕",
    color: "from-emerald-200 to-teal-100",
  },
  {
    id: 6,
    name: "Desk Lamp",
    price: 899,
    category: "Home",
    stock: 0,
    description: "A modern lamp for your study or workspace.",
    emoji: "💡",
    color: "from-yellow-200 to-amber-100",
  },
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const selectedProduct =
    products.find((product) => product.id === selectedId) || null;

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  function handleUpdate(updatedProduct) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === updatedProduct.id
          ? { ...product, ...updatedProduct }
          : product
      )
    );
  }

  const totalStock = products.reduce(
    (total, product) => total + Number(product.stock),
    0
  );

  return (
    <main className="app-background min-h-screen px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-xs font-bold tracking-widest text-violet-700 shadow-sm">
              <span>✦</span> SMART INVENTORY SYSTEM
            </div>

            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Product <span className="text-violet-700">Studio.</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Select a product, update its details, and manage your
              inventory in one beautiful workspace.
            </p>
          </div>

          <div className="rounded-2xl border border-white/70 bg-white/60 px-5 py-4 shadow-lg backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Workspace status
            </p>
            <p className="mt-2 flex items-center gap-2 font-bold text-emerald-700">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              System ready
            </p>
          </div>
        </header>

        {/* Statistics */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon="📦"
            label="Total Products"
            value={products.length}
            accent="text-violet-700"
          />
          <StatCard
            icon="🛒"
            label="Total Units in Stock"
            value={totalStock}
            accent="text-blue-700"
          />
          <StatCard
            icon="✨"
            label="Categories"
            value={categories.length - 1}
            accent="text-fuchsia-700"
          />
        </section>

        {/* Main layout */}
        <section className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left: Product list */}
          <div className="glass-panel rounded-3xl p-5 sm:p-7">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
                Your inventory
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                Existing Products
              </h2>
            </div>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Search products..."
              className="mb-4 w-full rounded-xl border border-white bg-white/80 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            />

            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    category === item
                      ? "bg-violet-700 text-white shadow-lg shadow-violet-200"
                      : "border border-white bg-white/70 text-slate-600 hover:bg-violet-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <ProductList
              products={filteredProducts}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          {/* Right: Edit selected product */}
          <ProductForm
            key={selectedProduct?.id ?? "no-product"}
            product={selectedProduct}
            onUpdate={handleUpdate}
          />
        </section>

        <footer className="py-8 text-center text-sm text-slate-500">
          Crafted with 💜 React Components & Tailwind CSS
        </footer>
      </div>
    </main>
  );
}

function StatCard({ icon, label, value, accent }) {
  return (
    <div className="stat-card rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <span className="text-3xl">{icon}</span>
        <span className={`text-3xl font-black ${accent}`}>{value}</span>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-600">{label}</p>
    </div>
  );
}

export default App;
