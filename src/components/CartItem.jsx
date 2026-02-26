import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md animate-fade-in">
      <img
        src={item.image}
        alt={item.title}
        className="w-24 h-32 object-cover rounded-md"
      />

      <div className="flex-1">
        <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
        <p className="text-sm text-gray-600">by {item.author}</p>
        <p className="text-primary-600 font-semibold mt-1">₹{item.price}</p>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="px-3 py-1 text-gray-700 hover:bg-gray-200 rounded-l-lg transition"
          >
            -
          </button>
          <span className="px-4 py-1 font-medium text-gray-800">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-3 py-1 text-gray-700 hover:bg-gray-200 rounded-r-lg transition"
          >
            +
          </button>
        </div>

        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700 transition p-2"
          title="Remove from cart"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <div className="text-right">
        <p className="font-bold text-lg text-gray-800">
          ₹{item.price * item.quantity}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
