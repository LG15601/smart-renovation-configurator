"use client";

import { useState } from "react";
import NewDesignModal from "@/components/modals/NewDesignModal";

const quickActions = [
  {
    title: "Upload Room",
    description: "Transform your space",
    icon: "📷",
    color: "bg-teal-100",
  },
  {
    title: "Build with AI",
    description: "Describe your vision",
    icon: "✨",
    color: "bg-rose-100",
  },
  {
    title: "Browse Templates",
    description: "Explore curated styles",
    icon: "🎨",
    color: "bg-sage-100",
  },
  {
    title: "Tutorials",
    description: "Learn the basics",
    icon: "📚",
    color: "bg-amber-100",
  },
];

const recentProjects = [
  {
    id: 1,
    title: "Living Room Makeover",
    style: "Scandinavian",
    progress: 85,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    isFavorite: true,
  },
  {
    id: 2,
    title: "Kitchen Renovation",
    style: "Modern",
    progress: 60,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Master Bedroom",
    style: "Japandi",
    progress: 100,
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop",
    isFavorite: true,
  },
];

const savedObjects = [
  { id: 1, name: "Velvet Sofa", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&h=150&fit=crop" },
  { id: 2, name: "Oak Table", image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=150&h=150&fit=crop" },
  { id: 3, name: "Floor Lamp", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=150&h=150&fit=crop" },
  { id: 4, name: "Monstera", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=150&h=150&fit=crop" },
];

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Immersive Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2000&h=1200&fit=crop"
          alt="Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />
      </div>

      {/* Floating UI Content */}
      <div className="relative z-10 min-h-screen p-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="glass-card px-6 py-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center">
              <svg className="w-5 h-5 text-brand-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">SmartReno</h1>
              <p className="text-sm text-gray-500">AI Interior Design</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="glass-card px-4 py-2.5 flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search projects..."
                className="bg-transparent text-sm w-48 focus:outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            <button className="glass-card p-3 hover:bg-white/90 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="glass-card p-1.5 flex items-center gap-3 pr-4">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                alt="User"
                className="w-9 h-9 rounded-lg object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">Simona G.</p>
                <p className="text-xs text-gray-500">Pro Plan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Hero Card */}
          <div className="col-span-4">
            <div className="glass-card-strong p-8 h-full">
              <div className="mb-6">
                <span className="px-3 py-1 bg-brand-accent/20 text-brand-primary text-xs font-semibold rounded-full">
                  ✨ AI-Powered
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
                Transform your room into a{" "}
                <span className="text-brand-primary">fully designed interior</span>{" "}
                instantly
              </h2>
              <p className="text-gray-600 mb-8">
                Upload a photo, floor plan, or describe your vision — get photorealistic designs tailored to your style.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 bg-brand-primary text-white font-semibold rounded-2xl hover:bg-brand-dark transition-all duration-300 shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:shadow-brand-primary/30 hover:-translate-y-0.5"
              >
                + New Project
              </button>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setIsModalOpen(true)}
                    className="p-4 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-200 text-left group"
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <p className="text-sm font-medium text-gray-900">{action.title}</p>
                    <p className="text-xs text-gray-500">{action.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column - Projects */}
          <div className="col-span-5">
            <div className="glass-card p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
                <button className="text-sm text-brand-primary font-medium hover:underline">View all</button>
              </div>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {project.progress === 100 && (
                        <div className="absolute inset-0 bg-brand-primary/20 flex items-center justify-center">
                          <span className="text-white text-lg">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900 truncate">{project.title}</h4>
                        <button className={`text-sm ${project.isFavorite ? "text-red-500" : "text-gray-300"}`}>
                          <svg className="w-4 h-4" fill={project.isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{project.style}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand-primary rounded-full transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{project.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Style Inspiration */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Style Inspiration</h3>
              <div className="grid grid-cols-3 gap-3">
                {["Scandinavian", "Modern", "Japandi", "Boho", "Industrial", "Minimalist"].map((style) => (
                  <button
                    key={style}
                    className="relative aspect-square rounded-xl overflow-hidden group"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-${
                        style === "Scandinavian" ? "1586023492125-27b2c045efd7" :
                        style === "Modern" ? "1556909114-f6e7ad7d3136" :
                        style === "Japandi" ? "1616594039964-ae9021a400a0" :
                        style === "Boho" ? "1617806118233-18e1de247200" :
                        style === "Industrial" ? "1524758631624-e2822e304c36" :
                        "1593062096033-9a26b09da705"
                      }?w=200&h=200&fit=crop`}
                      alt={style}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span className="absolute bottom-2 left-2 text-white text-xs font-medium">{style}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Saved & Stats */}
          <div className="col-span-3">
            <div className="glass-card p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Objects</h3>
              <div className="grid grid-cols-2 gap-3">
                {savedObjects.map((obj) => (
                  <div
                    key={obj.id}
                    className="aspect-square rounded-xl overflow-hidden relative group cursor-pointer"
                  >
                    <img
                      src={obj.image}
                      alt={obj.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-medium text-center px-2">{obj.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-brand-primary font-medium hover:underline">
                View all saved →
              </button>
            </div>

            {/* Stats Card */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Projects Created</span>
                  <span className="text-xl font-bold text-gray-900">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Renders Generated</span>
                  <span className="text-xl font-bold text-gray-900">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Items Saved</span>
                  <span className="text-xl font-bold text-gray-900">89</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-500">AI ready • 3 credits remaining</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Design Modal */}
      <NewDesignModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
