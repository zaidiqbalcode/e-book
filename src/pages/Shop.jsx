import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import booksData from '../data/books.json';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState(booksData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...new Set(booksData.map((book) => book.category))];

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }

    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  useEffect(() => {
    let filteredBooks = booksData;

    // Filter by category
    if (selectedCategory !== 'All') {
      filteredBooks = filteredBooks.filter(
        (book) => book.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      filteredBooks = filteredBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setBooks(filteredBooks);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Shop All Books
          </h1>
          <p className="text-gray-600">
            Browse our complete collection of e-books
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Filter by Category:
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="w-full md:w-auto">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Search:
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title or author..."
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{books.length}</span> books
          </p>
        </div>

        {/* Books Grid */}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No books found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
