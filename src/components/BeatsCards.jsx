import React, { useState } from 'react';

const beats = [
    {
        id: 1,
        trackName: "Sunny Vibes",
        producer: "Pritam Chakraborty",
        genre: "Lo-fi",
        key: "C Major",
        bpm: 95,
        price: 29.99,
        rating: 4.9,
        img: 'assets/Pritam.jpeg',
    },
    {
        id: 2,
        trackName: "Chill Beats",
        producer: "Dr.Dre",
        genre: "Hip Hop",
        key: "A Minor",
        bpm: 80,
        price: 19.99,
        rating: 4.5,
        img: 'assets/Dr.Dre.jpeg',
    },
    {
        id: 3,
        trackName: "Epic Journey",
        producer: "Pharell Williams",
        genre: "EDM",
        key: "E Minor",
        bpm: 120,
        price: 39.99,
        rating: 4.8,
        img: 'assets/pharell.jpeg',
    },
    {
        id: 4,
        trackName: "Dance Party Anthem",
        producer: "AR Rahman",
        genre: "Cinematic",
        key: "G Major",
        bpm: 128,
        price: 24.99,
        rating: 4.7,
        img: 'assets/AR.jpeg',
    },
];

const BeatsCards = ({ onAddToCart }) => {
    return (
        <div className="flex flex-wrap justify-center">
            {beats.map((beat) => (
                <div key={beat.id} className="w-full max-w-sm bg-gradient-to-r from-[#FFEFBA] to-[#FFFFFF] rounded-lg shadow-lg dark:bg-gray-800 m-2">
                    <div className="flex flex-col items-center pb-10">
                        <img 
                            className="w-24 h-24 mb-3 rounded-full shadow-lg" 
                              loading="lazy"
                            src={beat.img} 
                            alt={`${beat.trackName} cover`}
                        />
                        <h5 className="mb-1 text-2xl font-medium text-dark-brown dark:text-white">{beat.trackName}</h5>
                        <span className="text-lg text-gray-600 dark:text-gray-400">{beat.producer}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{beat.genre} | {beat.key} | {beat.bpm} BPM</span>
                        <span className="text-lg font-bold text-blue-700">${beat.price.toFixed(2)}</span>
                        <span className="text-sm text-dark-brown">Rating: {beat.rating}</span>
                        <div className="flex mt-4 md:mt-6">
                            <button 
                                onClick={() => onAddToCart(beat)} 
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-electric-blue rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
                            >
                                Add to Cart
                            </button>
                            <button 
                                // Implement preview functionality here
                                className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray_800 dark:text-gray_400 dark:border-gray_600 dark:hover:text-white dark:hover:bg-gray_700"
                            >
                                Preview
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BeatsCards;