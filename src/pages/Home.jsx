import React from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import booksData from '../data/books.json';

const Home = () => {
  const featuredBooks = booksData.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover Your Next Favorite Book
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-100">
              Explore thousands of e-books across all genres. Start your reading journey today.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Explore Books
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-primary-600 mb-2">10,000+</div>
              <div className="text-gray-600">Books Available</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-primary-600 mb-2">50,000+</div>
              <div className="text-gray-600">Happy Readers</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-primary-600 mb-2">4.8/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Books
            </h2>
            <p className="text-gray-600 text-lg">
              Handpicked selections from our collection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              View All Books
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Browse by Category
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Self-Help', 'Business', 'Finance', 'History', 'Biography', 'Productivity', 'Spirituality', 'Psychology'].map(
              (category) => (
                <Link
                  key={category}
                  to={`/shop?category=${category}`}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center group"
                >
                  <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition">
                    {category}
                  </h3>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Reading Today
          </h2>
          <p className="text-lg mb-8 text-primary-100">
            Join thousands of readers and discover your next great book
          </p>
          <Link
            to="/shop"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
