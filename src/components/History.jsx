import React from 'react';

const History = ({ purchaseHistory }) => {
  return (
    <div className="flex flex-col items-center pt-20">
      <h2 className="text-xl font-bold text-dark-brown text-center pt-10">Purchase History</h2>
      {purchaseHistory.length === 0 ? (
        <p>No purchases made yet.</p>
      ) : (
        <div className="flex flex-wrap justify-center w-full max-w-6xl"> {/* Flex container for horizontal layout */}
          {purchaseHistory.map((item) => (
            <div key={item.id} className="w-full max-w-sm bg-gradient-to-r from-[#FFEFBA] to-[#FFFFFF] rounded-lg shadow-lg dark:bg-gray-800 m-4">
              <div className="flex flex-col items-center pb-10">
                <img 
                  className="w-24 h-24 mb-3 rounded-full shadow-lg" 
                  src={item.img} 
                  alt={`${item.trackName} cover`}
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{item.trackName}</h5>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.producer}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.genre} | {item.key} | {item.bpm} BPM</span>
                <span className="text-lg font-bold text-blue-700">${item.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;