"use client";

import { useState } from "react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Modern Velvet Sofa",
    brand: "West Elm",
    price: 1299,
    originalPrice: 1599,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    category: "Seating",
    rating: 4.8,
    reviews: 234,
    inDesign: true,
    colors: ["#4A5568", "#8B7355", "#2D3748", "#E2D5C3"],
  },
  {
    id: 2,
    name: "Walnut Coffee Table",
    brand: "Article",
    price: 449,
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&h=400&fit=crop",
    category: "Tables",
    rating: 4.9,
    reviews: 156,
    inDesign: true,
    colors: ["#8B7355", "#2D3748"],
  },
  {
    id: 3,
    name: "Arc Floor Lamp",
    brand: "CB2",
    price: 189,
    originalPrice: 229,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    category: "Lighting",
    rating: 4.7,
    reviews: 89,
    inDesign: true,
    colors: ["#1A1A1A", "#F5F5DC"],
  },
  {
    id: 4,
    name: "Moroccan Area Rug",
    brand: "Ruggable",
    price: 349,
    image: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=400&h=400&fit=crop",
    category: "Decor",
    rating: 4.6,
    reviews: 312,
    inDesign: true,
    colors: [],
  },
  {
    id: 5,
    name: "Fiddle Leaf Fig Tree",
    brand: "The Sill",
    price: 129,
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop",
    category: "Plants",
    rating: 4.5,
    reviews: 78,
    inDesign: false,
    colors: [],
  },
  {
    id: 6,
    name: "Linen Throw Pillows",
    brand: "Parachute",
    price: 79,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop",
    category: "Decor",
    rating: 4.8,
    reviews: 167,
    inDesign: false,
    colors: ["#E8DED1", "#A8B5A0", "#C9B8A8", "#6B8E8E"],
  },
  {
    id: 7,
    name: "Ceramic Table Lamp",
    brand: "Rejuvenation",
    price: 249,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop",
    category: "Lighting",
    rating: 4.7,
    reviews: 54,
    inDesign: false,
    colors: ["#F5F5DC", "#4A5568"],
  },
  {
    id: 8,
    name: "Bookshelf",
    brand: "IKEA",
    price: 199,
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&h=400&fit=crop",
    category: "Storage",
    rating: 4.4,
    reviews: 421,
    inDesign: false,
    colors: ["#8B7355", "#F5F5DC", "#1A1A1A"],
  },
];

const categories = ["All", "Seating", "Tables", "Lighting", "Decor", "Plants", "Storage"];
const priceRanges = ["All", "Under $100", "$100-$300", "$300-$500", "$500+"];
const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low", "Top Rated"];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [showInDesignOnly, setShowInDesignOnly] = useState(false);
  const [cart, setCart] = useState<number[]>([]);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== "All" && product.category !== selectedCategory) return false;
    if (showInDesignOnly && !product.inDesign) return false;
    if (selectedPriceRange !== "All") {
      if (selectedPriceRange === "Under $100" && product.price >= 100) return false;
      if (selectedPriceRange === "$100-$300" && (product.price < 100 || product.price > 300)) return false;
      if (selectedPriceRange === "$300-$500" && (product.price < 300 || product.price > 500)) return false;
      if (selectedPriceRange === "$500+" && product.price < 500) return false;
    }
    return true;
  });

  const toggleCart = (productId: number) => {
    setCart((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const cartTotal = cart.reduce((sum, id) => {
    const product = products.find((p) => p.id === id);
    return sum + (product?.price || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Shop Products</h1>
            <p className="text-gray-500 mt-1">Find the perfect pieces for your design</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-64 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="relative p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-primary text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Filters Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-100 min-h-[calc(100vh-89px)] p-6">
          {/* In Design Toggle */}
          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setShowInDesignOnly(!showInDesignOnly)}
                className={`
                  w-10 h-6 rounded-full transition-colors relative
                  ${showInDesignOnly ? "bg-brand-primary" : "bg-gray-200"}
                `}
              >
                <div
                  className={`
                    absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                    ${showInDesignOnly ? "translate-x-5" : "translate-x-1"}
                  `}
                />
              </div>
              <span className="text-sm font-medium text-gray-700">In My Design</span>
            </label>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Category</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                    ${selectedCategory === category
                      ? "bg-sage-100 text-brand-primary font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h3>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedPriceRange(range)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                    ${selectedPriceRange === range
                      ? "bg-sage-100 text-brand-primary font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSelectedPriceRange("All");
              setShowInDesignOnly(false);
            }}
            className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear all filters
          </button>
        </aside>

        {/* Products Grid */}
        <main className="flex-1 p-8">
          {/* Sort & Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-900">{filteredProducts.length}</span> products found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-card transition-all duration-200 group"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.inDesign && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-brand-primary text-white text-xs font-medium rounded-full">
                      In Your Design
                    </div>
                  )}
                  {product.originalPrice && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                      Sale
                    </div>
                  )}
                  <button
                    onClick={() => toggleCart(product.id)}
                    className={`
                      absolute bottom-3 right-3 p-2 rounded-full transition-all duration-200
                      ${cart.includes(product.id)
                        ? "bg-brand-primary text-white"
                        : "bg-white text-gray-700 opacity-0 group-hover:opacity-100"
                      }
                    `}
                  >
                    {cart.includes(product.id) ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                  <h3 className="font-medium text-gray-900 mb-2 truncate">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                  </div>
                  {product.colors.length > 0 && (
                    <div className="flex items-center gap-1 mb-3">
                      {product.colors.slice(0, 4).map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      {product.colors.length > 4 && (
                        <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Cart Summary Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-60 right-0 bg-white border-t border-gray-200 px-8 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {cart.length} item{cart.length > 1 ? "s" : ""} in cart
              </span>
              <span className="text-xl font-semibold text-gray-900">
                ${cartTotal.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCart([])}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Clear Cart
              </button>
              <button className="px-6 py-2.5 bg-brand-primary text-white font-medium rounded-xl hover:bg-brand-dark transition-colors">
                Checkout →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
