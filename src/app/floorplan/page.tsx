"use client";

import { useState } from "react";
import Link from "next/link";

const furnitureItems = [
  { id: "sofa", name: "Sofa", icon: "🛋️", category: "seating" },
  { id: "chair", name: "Chair", icon: "🪑", category: "seating" },
  { id: "table", name: "Table", icon: "🪵", category: "tables" },
  { id: "bed", name: "Bed", icon: "🛏️", category: "bedroom" },
  { id: "desk", name: "Desk", icon: "🖥️", category: "office" },
  { id: "lamp", name: "Lamp", icon: "💡", category: "lighting" },
  { id: "plant", name: "Plant", icon: "🪴", category: "decor" },
  { id: "rug", name: "Rug", icon: "🟫", category: "decor" },
];

const categories = ["All", "Seating", "Tables", "Bedroom", "Office", "Lighting", "Decor"];

const roomElements = [
  { id: 1, type: "sofa", x: 180, y: 250, width: 160, height: 70, rotation: 0 },
  { id: 2, type: "table", x: 250, y: 200, width: 60, height: 40, rotation: 0 },
  { id: 3, type: "chair", x: 120, y: 180, width: 40, height: 40, rotation: 45 },
  { id: 4, type: "plant", x: 350, y: 100, width: 30, height: 30, rotation: 0 },
  { id: 5, type: "lamp", x: 100, y: 280, width: 25, height: 25, rotation: 0 },
  { id: 6, type: "rug", x: 200, y: 200, width: 120, height: 80, rotation: 0 },
];

export default function FloorPlanPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedElement, setSelectedElement] = useState<number | null>(null);
  const [elements, setElements] = useState(roomElements);
  const [zoom, setZoom] = useState(100);
  const [showShareModal, setShowShareModal] = useState(false);

  const filteredItems = selectedCategory === "All"
    ? furnitureItems
    : furnitureItems.filter((item) => item.category === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-sage-50 flex">
      {/* Left Sidebar - Furniture Library */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-semibold text-gray-900">SmartReno</span>
            </Link>
          </div>
          <div className="text-sm text-gray-500 mb-2">Austin, TX</div>
          <div className="font-medium text-gray-900">Townhouse Redesign</div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600" title="Undo">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600" title="Redo">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
            </svg>
          </button>
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600" title="Grid">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600" title="Layers">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search furniture..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
            />
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 pb-3">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                  ${selectedCategory === category
                    ? "bg-brand-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Furniture Items */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                className="p-3 bg-gray-50 rounded-xl hover:bg-sage-100 hover:border-brand-primary/30 border border-transparent transition-all duration-200 text-center"
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-xs text-gray-700 font-medium">{item.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-gray-900">Floor Plan Editor</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Auto-saved
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Zoom Controls */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setZoom(Math.max(50, zoom - 10))}
                className="p-1.5 rounded hover:bg-white transition-colors"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="text-sm text-gray-600 min-w-[40px] text-center">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 10))}
                className="p-1.5 rounded hover:bg-white transition-colors"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            <button
              onClick={() => setShowShareModal(true)}
              className="px-4 py-2 bg-brand-primary text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto p-8">
          <div 
            className="mx-auto bg-white rounded-2xl shadow-card border border-gray-200 overflow-hidden"
            style={{ 
              width: `${500 * (zoom / 100)}px`, 
              height: `${400 * (zoom / 100)}px`,
              transform: `scale(1)`,
            }}
          >
            {/* Grid Background */}
            <svg className="w-full h-full" style={{ background: "#FAFAFA" }}>
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Room Walls */}
              <rect
                x="50"
                y="50"
                width="400"
                height="300"
                fill="none"
                stroke="#374151"
                strokeWidth="4"
              />
              
              {/* Door */}
              <path
                d="M 50 200 L 50 250"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="4"
                strokeDasharray="8 4"
              />
              
              {/* Window */}
              <rect
                x="200"
                y="50"
                width="100"
                height="8"
                fill="#60A5FA"
                stroke="#3B82F6"
                strokeWidth="1"
              />

              {/* Furniture Elements */}
              {elements.map((el) => {
                const item = furnitureItems.find((f) => f.id === el.type);
                const isSelected = selectedElement === el.id;
                return (
                  <g
                    key={el.id}
                    onClick={() => setSelectedElement(isSelected ? null : el.id)}
                    style={{ cursor: "pointer" }}
                    transform={`rotate(${el.rotation} ${el.x + el.width / 2} ${el.y + el.height / 2})`}
                  >
                    <rect
                      x={el.x}
                      y={el.y}
                      width={el.width}
                      height={el.height}
                      fill={isSelected ? "#E8F0E8" : "#F3F4F6"}
                      stroke={isSelected ? "#1B3D2F" : "#D1D5DB"}
                      strokeWidth={isSelected ? 2 : 1}
                      rx="4"
                    />
                    <text
                      x={el.x + el.width / 2}
                      y={el.y + el.height / 2 + 6}
                      textAnchor="middle"
                      fontSize="20"
                    >
                      {item?.icon}
                    </text>
                    {isSelected && (
                      <>
                        {/* Resize handles */}
                        <circle cx={el.x} cy={el.y} r="4" fill="#1B3D2F" />
                        <circle cx={el.x + el.width} cy={el.y} r="4" fill="#1B3D2F" />
                        <circle cx={el.x} cy={el.y + el.height} r="4" fill="#1B3D2F" />
                        <circle cx={el.x + el.width} cy={el.y + el.height} r="4" fill="#1B3D2F" />
                      </>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Room: <span className="text-gray-900 font-medium">Living Room</span>
            </div>
            <div className="text-sm text-gray-500">
              Size: <span className="text-gray-900 font-medium">20ft × 16ft</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/compare"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              ← Back to Comparison
            </Link>
            <Link
              href="/products"
              className="px-4 py-2 bg-brand-primary text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors"
            >
              Shop Products →
            </Link>
          </div>
        </div>
      </div>

      {/* Right Properties Panel */}
      {selectedElement && (
        <div className="w-72 bg-white border-l border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Properties</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Type</label>
              <p className="text-gray-900 font-medium capitalize">
                {elements.find((e) => e.id === selectedElement)?.type}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Width</label>
                <input
                  type="number"
                  value={elements.find((e) => e.id === selectedElement)?.width}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Height</label>
                <input
                  type="number"
                  value={elements.find((e) => e.id === selectedElement)?.height}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Rotation</label>
              <input
                type="range"
                min="0"
                max="360"
                value={elements.find((e) => e.id === selectedElement)?.rotation || 0}
                className="w-full"
              />
            </div>
            <button
              onClick={() => {
                setElements(elements.filter((e) => e.id !== selectedElement));
                setSelectedElement(null);
              }}
              className="w-full py-2 text-red-600 text-sm font-medium hover:bg-red-50 rounded-lg transition-colors"
            >
              Remove Item
            </button>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowShareModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-modal p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Share Floor Plan</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-2">Share Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value="https://smartreno.app/plan/abc123"
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                  />
                  <button className="px-4 py-2 bg-brand-primary text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors">
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">Export as</label>
                <div className="grid grid-cols-3 gap-2">
                  {["PNG", "PDF", "3D Model"].map((format) => (
                    <button
                      key={format}
                      className="py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
