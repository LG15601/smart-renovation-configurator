"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const beforeImage = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&h=1000&fit=crop";
const afterImage = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&h=1000&fit=crop";

const suggestedProducts = [
  { id: 1, name: "Velvet Sofa", price: "$1,299", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop" },
  { id: 2, name: "Coffee Table", price: "$449", image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=200&h=200&fit=crop" },
  { id: 3, name: "Floor Lamp", price: "$189", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&h=200&fit=crop" },
  { id: 4, name: "Area Rug", price: "$349", image: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=200&h=200&fit=crop" },
];

export default function ComparePage() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showProducts, setShowProducts] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <div className={`min-h-screen bg-gray-900 ${isFullscreen ? "fixed inset-0 z-50" : ""}`}>
      {/* Header */}
      <header className={`absolute top-0 left-0 right-0 z-20 ${isFullscreen ? "ml-0" : ""}`}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-white font-semibold">Living Room Makeover</h1>
              <p className="text-white/60 text-sm">Scandinavian Style</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowProducts(!showProducts)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                showProducts ? "bg-white text-gray-900" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Shop
              </span>
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
            >
              {isFullscreen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
            </button>
            <button className="p-2 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <button className="p-2 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Comparison Area */}
      <div className="flex h-screen">
        <div 
          ref={containerRef}
          className={`relative flex-1 cursor-ew-resize select-none ${isFullscreen ? "ml-0" : ""}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* After Image (Full) */}
          <div className="absolute inset-0">
            <img
              src={afterImage}
              alt="After"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>

          {/* Before Image (Clipped) */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={beforeImage}
              alt="Before"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ 
                width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100vw",
                maxWidth: "none"
              }}
              draggable={false}
            />
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
            style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full">
            <span className="text-white text-sm font-medium">Before</span>
          </div>
          <div className="absolute bottom-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
            <span className="text-gray-900 text-sm font-medium">After ✨</span>
          </div>
        </div>

        {/* Products Sidebar */}
        {showProducts && !isFullscreen && (
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Shop the Look</h2>
              <p className="text-sm text-gray-500 mb-6">Products from this design</p>
              
              <div className="space-y-4">
                {suggestedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-brand-primary/30 hover:shadow-card transition-all duration-200 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                      <p className="text-brand-primary font-semibold">{product.price}</p>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 bg-brand-primary text-white font-medium rounded-xl hover:bg-brand-dark transition-colors">
                View All Products
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="flex items-center justify-center gap-4 px-6 py-4 bg-gradient-to-t from-black/80 to-transparent">
          <button className="px-6 py-3 bg-white text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Regenerate
          </button>
          <button className="px-6 py-3 bg-brand-primary text-white font-medium rounded-xl hover:bg-brand-dark transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Design
          </button>
          <Link
            href="/floorplan"
            className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            View Floor Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
