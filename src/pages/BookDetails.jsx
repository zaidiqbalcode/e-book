import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import booksData from '../data/books.json';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const book = booksData.find((b) => b.id === parseInt(id));

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Book not found</h2>
          <Link
            to="/shop"
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-primary-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-primary-600">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{book.title}</span>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Book Image */}
            <div className="flex justify-center">
              <img
                src={book.image}
                alt={book.title}
                className="w-full max-w-md h-auto rounded-lg shadow-xl"
              />
            </div>

            {/* Book Details */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="inline-block bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  {book.category}
                </span>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  {book.title}
                </h1>
                
                <p className="text-lg text-gray-600 mb-4">by {book.author}</p>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-1">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold text-gray-700">{book.rating}</span>
                  </div>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-600">{book.pages} pages</span>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Description</h2>
                  <p className="text-gray-600 leading-relaxed">{book.description}</p>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-primary-600">₹{book.price}</span>
                    <span className="text-sm text-gray-500">One-time purchase</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => addToCart(book)}
                    className="flex-1 bg-gray-100 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-200 transition font-semibold text-lg flex items-center justify-center space-x-2"
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => navigate(`/checkout?bookId=${book.id}`)}
                    className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition font-semibold text-lg"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            More books in {book.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {booksData
              .filter((b) => b.category === book.category && b.id !== book.id)
              .slice(0, 4)
              .map((relatedBook) => (
                <Link
                  key={relatedBook.id}
                  to={`/book/${relatedBook.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  <img
                    src={relatedBook.image}
                    alt={relatedBook.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">
                      {relatedBook.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{relatedBook.author}</p>
                    <p className="text-primary-600 font-bold">₹{relatedBook.price}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
