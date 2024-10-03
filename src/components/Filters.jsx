import React from 'react';

const Filters = () => {
    const buttons = ["Genre", "Mood", "Instrument", "Key", "BPM"];

    return (
        <div className="w-78 h-96 rounded-lg mt-2 bg-light-black">
            <h2 className="text-[#4A3728] text-2xl text-white text-center font-bold py-4">Filter By</h2>
            <div className="flex flex-col space-y-2 items-center">
                {buttons.map((label, index) => (
                    <button 
                        key={index} 
                        className="text-dark-brown py-2 w-44 rounded-full bg-cream hover:bg-electric-blue hover:text-white transition duration-300 flex items-center justify-center"
                        style={{ height: '50px' }} // Set a fixed height for alignment
                    >
                        {/* <img src="assets/filter.png" width="30" alt="filter icon" className="mr-2" /> */}
                        <span>{label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Filters;