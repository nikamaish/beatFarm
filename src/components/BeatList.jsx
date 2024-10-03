import React from 'react';

const BeatList = () => {
  const beats = [
    { id: 1, name: 'Beat 1', key: 'C Minor', bpm: 120 },
    { id: 2, name: 'Beat 2', key: 'D Major', bpm: 90 }
  ];

  return (
    <div className="bg-light-brown p-6">
      <ul className="space-y-4">
        {beats.map((beat) => (
          <li key={beat.id} className="flex justify-between items-center p-4 bg-cream rounded-lg">
            <button className="text-electric-blue">▶️</button>
            <div className="flex-grow ml-4">
              <p className="font-bold text-dark-brown">{beat.name}</p>
              <p className="text-sm text-dark-brown">Key: {beat.key} | BPM: {beat.bpm}</p>
            </div>
            <button className="text-electric-blue">Share</button>
            <button className="text-electric-blue">Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BeatList;
