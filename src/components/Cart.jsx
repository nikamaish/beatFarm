import React, { useState } from 'react';

const Cart = ({ cart, onRemoveFromCart, onPurchase }) => {
    const [purchaseMessage, setPurchaseMessage] = useState('');

    return (
        <div className="flex flex-col items-center pt-24">
            <h2 className="text-xl font-bold text-dark-brown text-center ">Shopping Cart</h2>
            {purchaseMessage && (
                <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
                    {purchaseMessage}
                </div>
            )}
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="flex flex-wrap justify-center w-full">
                    {cart.map((item) => (
                        <div key={item.id} className="w-full max-w-sm bg-gradient-to-r from-[#FFEFBA] to-[#FFFFFF] rounded-lg shadow-lg m-4">
                            <div className="flex flex-col items-center pb-10">
                                <img
                                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                    src={item.img}
                                    alt={`${item.trackName} cover`}
                                />
                                <h5 className="mb-1 text-xl font-medium text-gray-900">{item.trackName}</h5>
                                <span className="text-sm text-gray-600">{item.producer}</span>
                                <span className="text-sm text-gray-600">{item.genre} | {item.key} | {item.bpm} BPM</span>
                                <span className="text-lg font-bold text-blue-700">${item.price.toFixed(2)}</span>
                                <span className="text-sm text-dark-brown">Rating: {item.rating}</span>
                                <div className="flex mt-4 md:mt-6">
                                    <button
                                        onClick={() => {
                                            onPurchase(item);
                                            setPurchaseMessage(`${item.trackName} purchased successfully!`);
                                            setTimeout(() => setPurchaseMessage(''), 3000); // Clear message after 3 seconds
                                        }}
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                    >
                                        Purchase
                                    </button>
                                    <button
                                        onClick={() => onRemoveFromCart(item.id)}
                                        className="py-2 px-4 ms-2 text-sm font-medium text-red-600 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;