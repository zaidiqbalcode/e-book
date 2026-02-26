import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const BookCard = ({ book }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in">
      <Link to={`/book/${book.id}`}>
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            ₹{book.price}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/book/${book.id}`}>
          <h3 className="font-bold text-lg text-gray-800 mb-1 hover:text-primary-600 transition line-clamp-1">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <svg
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">{book.rating}</span>
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {book.category}
          </span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => addToCart(book)}
            className="flex-1 bg-gray-100 text-gray-800 py-2 px-3 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
          >
            Add to Cart
          </button>
          <Link
            to={`/checkout?bookId=${book.id}`}
            className="flex-1 bg-primary-600 text-white py-2 px-3 rounded-lg hover:bg-primary-700 transition font-medium text-sm text-center"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
