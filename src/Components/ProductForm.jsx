
import { useState } from "react";

function ProductForm({ product, onUpdate }) {
  const [form, setForm] = useState(() =>
    product ? { ...product } : null
  );

  const [saved, setSaved] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form) return;

    onUpdate({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });

    setSaved(true);
  }

  function handleReset() {
    setForm({ ...product });
    setSaved(false);
  }

  if (!product || !form) {
    return (
      <div className="glass-panel rounded-3xl p-10 text-center">
        <div className="text-5xl">🛍️</div>
        <h2 className="mt-4 text-xl font-extrabold text-slate-800">
          Select a product
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Choose a product from the list to edit its information.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel overflow-hidden rounded-3xl">
      {/* Form header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-purple-600 to-indigo-600 p-6 text-white sm:p-8">
        <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/10" />
        <div className="absolute -bottom-12 right-20 h-28 w-28 rounded-full bg-fuchsia-300/20" />

        <div className="relative">
          <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-bold tracking-wider">
            PRODUCT EDITOR
          </span>

          <div className="mt-5 flex items-center gap-4">
            <div
              className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${form.color} text-4xl shadow-xl`}
            >
              {form.emoji}
            </div>

            <div className="min-w-0">
              <h2 className="text-2xl font-black">
                Edit Product
              </h2>
              <p className="mt-1 break-words text-sm text-violet-100">
                Product ID: #{product.id}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Editable fields */}
      <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Product Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            maxLength={80}
            className="form-input"
            placeholder="Enter product name"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Price (₹)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div>
            <label
              htmlFor="stock"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Stock Quantity
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              step="1"
              value={form.stock}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="form-input"
          >
            <option>Electronics</option>
            <option>Accessories</option>
            <option>Fashion</option>
            <option>Home</option>
            <option>Stationery</option>
            <option>Beauty</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-bold text-slate-700"
          >
            Product Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            maxLength={500}
            value={form.description}
            onChange={handleChange}
            required
            className="form-input resize-y"
            placeholder="Describe your product..."
          />
        </div>

        {/* Preview */}
        <div className="rounded-2xl border border-violet-100 bg-violet-50/70 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
            Live price preview
          </p>
          <p className="mt-2 text-2xl font-black text-slate-900">
            ₹{Number(form.price || 0).toLocaleString("en-IN")}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {form.name || "Unnamed product"} · {form.stock || 0} units
          </p>
        </div>

        {saved && (
          <div
            role="status"
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
          >
            ✓ Product updated successfully!
          </div>
        )}

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-gradient-to-r from-violet-700 to-indigo-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            ✓ Save Changes
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-slate-200 bg-white/80 px-5 py-3.5 font-bold text-slate-700 transition hover:bg-slate-100"
          >
            ↺ Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
