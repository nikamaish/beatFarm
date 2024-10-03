import React from 'react';
import Sidebar from './Sidebar';
import AudioPlayer from './AudioPlayer';
import Searchbar from './Searchbar';
import HeroSection from './HeroSection';
import BeatsCards from './BeatsCards';

const Main = ({ onAddToCart }) => {
  return (
    <div className="main-layout flex flex-col-reverse lg:flex-row mb-24">
      {/* Sidebar will appear below the main content on small screens */}
      <div className="w-full lg:w-1/4 p-2 lg:order-1">
        <Sidebar />
      </div>

      {/* HeroSection, Searchbar, and BeatsCards will appear above Sidebar on small screens */}
      <div className="w-full lg:w-3/4 pt-20 pr-2 lg:order-2">
        <HeroSection />
        <div className="flex flex-col pt-4">
          <Searchbar />
          <div>
            <AudioPlayer  />
            <BeatsCards onAddToCart={onAddToCart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
