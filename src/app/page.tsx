"use client";

import { useState } from "react";
import NewDesignModal from "@/components/modals/NewDesignModal";

const quickStartItems = [
  {
    title: "Upload Photo",
    description: "Start from a room photo",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Floor Plan",
    description: "Design from scratch",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: "Text Prompt",
    description: "Describe your vision",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: "AI Suggest",
    description: "Get style recommendations",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

const recentProjects = [
  {
    id: 1,
    title: "Living Room Makeover",
    style: "Scandinavian",
    date: "2 days ago",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    isFavorite: true,
  },
  {
    id: 2,
    title: "Kitchen Renovation",
    style: "Modern",
    date: "5 days ago",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Master Bedroom",
    style: "Japandi",
    date: "1 week ago",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop",
    isFavorite: true,
  },
  {
    id: 4,
    title: "Home Office",
    style: "Minimalist",
    date: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=400&h=300&fit=crop",
    isFavorite: false,
  },
];

const styleCategories = [
  { name: "All", count: 24 },
  { name: "Scandinavian", count: 8 },
  { name: "Modern", count: 6 },
  { name: "Japandi", count: 4 },
  { name: "Boho", count: 3 },
  { name: "Industrial", count: 3 },
];

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStyle, setActiveStyle] = useState("All");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Hello, Simona! 👋</h1>
            <p className="text-gray-500 mt-1">Ready to transform your space?</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-64 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Quick Start Section */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Start</h2>
          <div className="grid grid-cols-4 gap-4">
            {quickStartItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setIsModalOpen(true)}
                className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-brand-primary/30 hover:shadow-card transition-all duration-200 text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center text-brand-primary mb-4 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Recent Projects Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
            <button className="text-sm text-brand-primary font-medium hover:underline">
              View all
            </button>
          </div>

          {/* Style Filters */}
          <div className="flex items-center gap-2 mb-6">
            {styleCategories.map((style) => (
              <button
                key={style.name}
                onClick={() => setActiveStyle(style.name)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${activeStyle === style.name
                    ? "bg-brand-primary text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-brand-primary/30"
                  }
                `}
              >
                {style.name}
                <span className={`ml-1.5 ${activeStyle === style.name ? "text-white/70" : "text-gray-400"}`}>
                  {style.count}
                </span>
              </button>
            ))}
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-4 gap-6">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-card transition-all duration-200"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      project.isFavorite
                        ? "bg-white text-red-500"
                        : "bg-black/20 text-white hover:bg-white hover:text-red-500"
                    }`}
                  >
                    <svg className="w-4 h-4" fill={project.isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                      {project.style}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">{project.title}</h3>
                  <p className="text-sm text-gray-500">{project.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* New Design Modal */}
      <NewDesignModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
