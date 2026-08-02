import React from 'react';
import { Project } from '../types';

const projects: Project[] = [
  { id: 1, title: "Neon Horizon", category: "Web Design", image: "https://picsum.photos/800/600?random=1" },
  { id: 2, title: "Abstract Flow", category: "Branding", image: "https://picsum.photos/800/600?random=2" },
  { id: 3, title: "Urban Decay", category: "Photography", image: "https://picsum.photos/800/600?random=3" },
  { id: 4, title: "Digital Silence", category: "Development", image: "https://picsum.photos/800/600?random=4" },
];

export const Gallery: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-neutral-950 text-white">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Recent Works</h2>
        <span className="text-neutral-500 hidden md:block">2023 — 2024</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {projects.map((project) => (
          <div key={project.id} className="group cursor-pointer">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-900 mb-6">
              <img 
                src={project.image} 
                alt={project.title}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <div className="flex justify-between items-start border-t border-neutral-800 pt-6">
              <div>
                <h3 className="text-2xl font-medium mb-1">{project.title}</h3>
                <p className="text-neutral-500 text-sm">{project.category}</p>
              </div>
              <span className="h-8 w-8 rounded-full border border-neutral-700 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                ↗
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
