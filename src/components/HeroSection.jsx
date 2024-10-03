import React, { useState, useEffect } from 'react';

const HeroSection = ({ autoSlide = true, autoSlideInterval = 1800 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides1 = [
    { src: '/assets/hiphop.jpg', alt: 'Slide 1' },
    { src: '/assets/Lofi Chill.jpg', alt: 'Slide 2' },
    { src: '/assets/electronic.jpg', alt: 'Slide 3' },
  ];

  const slides2 = [
    { src: '/assets/indianClassical.jpg', alt: 'Slide 4' },
    { src: '/assets/punk.jpg', alt: 'Slide 5' },
    { src: '/assets/indie.jpg', alt: 'Slide 6' },
  ];

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides1.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-slide functionality with useEffect
  useEffect(() => {
    let slideInterval;
    if (autoSlide && !isPaused) {
      slideInterval = setInterval(goToNextSlide, autoSlideInterval);
    }
    return () => clearInterval(slideInterval); // Cleanup the interval on component unmount or when isPaused changes
  }, [autoSlide, autoSlideInterval, isPaused]);

  return (
    <div style={{ fontFamily: 'Lufga, sans-serif', textAlign: 'center' }}>
      <div className="flex justify-between items-center space-x-4 mb-4"> {/* Flex container for h2 and button */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-dark-brown"> {/* Adjust size for small devices */}
          Fresh Packs Hot Off The Ranch
        </h2>
        <button
          className="px-3 py-2 sm:px-4 sm:py-3 sm:text-sm md:text-base bg-electric-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => window.location.href = '/'}
        >
          Check Out All Packs
        </button>
      </div>
      <div className="flex justify-center space-x-4"> {/* Flex container for side-by-side layout */}
        <div className="relative w-1/2"> {/* Adjust width as needed */}
          <div
            id="default-HeroSection"
            className="relative h-56 overflow-hidden rounded-lg md:h-96"
            onMouseEnter={() => setIsPaused(false)} // Pause auto-slide on hover
            onMouseLeave={() => setIsPaused(false)} // Resume auto-slide on mouse leave
          >
            {slides1.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={slide.src}
                  className="block w-full h-full object-cover" // Use object-cover for better fitting
                  loading="lazy"
                  alt={slide.alt}
                />
              </div>
            ))}
          </div>

          {/* Slider indicators */}
          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
            {slides1.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Slide ${index + 1}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Second Hero Section */}
        <div className="relative w-1/2"> {/* Adjust width as needed */}
          <div
            id="default-HeroSection"
            className="relative h-56 overflow-hidden rounded-lg md:h-96"
            onMouseEnter={() => setIsPaused(true)} // Pause auto-slide on hover
            onMouseLeave={() => setIsPaused(false)} // Resume auto-slide on mouse leave
          >
            {slides2.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={slide.src}
                  className="block w-full h-full object-cover" // Use object-cover for better fitting
                  loading="lazy"
                  alt={slide.alt}
                />
              </div>
            ))}
          </div>

          {/* Slider indicators */}
          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
            {slides2.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Slide ${index + 1}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
