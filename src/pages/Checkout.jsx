import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import booksData from '../data/books.json';
import toast from 'react-hot-toast';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [orderItems, setOrderItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [customerDetails, setCustomerDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    const bookId = searchParams.get('bookId');

    if (bookId) {
      // Buy Now - Single book
      const book = booksData.find((b) => b.id === parseInt(bookId));
      if (book) {
        setOrderItems([{ ...book, quantity: 1 }]);
        setTotalAmount(book.price);
      } else {
        toast.error('Book not found');
        navigate('/shop');
      }
    } else {
      // Checkout from cart
      if (cartItems.length === 0) {
        toast.error('Your cart is empty');
        navigate('/cart');
        return;
      }
      setOrderItems(cartItems);
      setTotalAmount(getCartTotal());
    }
  }, [searchParams, cartItems, getCartTotal, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!customerDetails.fullName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!customerDetails.email.trim() || !/\S+@\S+\.\S+/.test(customerDetails.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!customerDetails.phone.trim() || !/^\d{10}$/.test(customerDetails.phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }
    if (!customerDetails.address.trim()) {
      toast.error('Please enter your address');
      return false;
    }
    if (!customerDetails.city.trim()) {
      toast.error('Please enter your city');
      return false;
    }
    if (!customerDetails.state.trim()) {
      toast.error('Please enter your state');
      return false;
    }
    if (!customerDetails.pincode.trim() || !/^\d{6}$/.test(customerDetails.pincode)) {
      toast.error('Please enter a valid 6-digit pincode');
      return false;
    }
    return true;
  };

  const handlePayment = () => {
    // Validate form first
    if (!validateForm()) {
      return;
    }

    // Demo payment simulation
    toast.loading('Processing payment...', { duration: 2000 });
    
    setTimeout(() => {
      // Generate a mock order ID
      const mockOrderId = 'RZP_' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      // Clear cart if checkout was from cart
      if (!searchParams.get('bookId')) {
        clearCart();
      }
      
      toast.success('Payment successful!');
      
      // Navigate to success page
      setTimeout(() => {
        navigate('/success', {
          state: {
            orderId: mockOrderId,
            amount: totalAmount,
            customerDetails: customerDetails,
          },
        });
      }, 500);
    }, 2000);
  };

  if (orderItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Details Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Billing Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={customerDetails.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerDetails.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerDetails.phone}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      maxLength="10"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={customerDetails.address}
                    onChange={handleInputChange}
                    placeholder="Street address, apartment, suite, etc."
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={customerDetails.city}
                      onChange={handleInputChange}
                      placeholder="Mumbai"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={customerDetails.state}
                      onChange={handleInputChange}
                      placeholder="Maharashtra"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={customerDetails.pincode}
                      onChange={handleInputChange}
                      placeholder="400001"
                      maxLength="6"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 pb-4 border-b last:border-b-0"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.author}</p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Details</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>₹0</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-800">
                  <span>Total Amount</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold text-lg flex items-center justify-center space-x-2"
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>Pay Now</span>
              </button>

              <div className="mt-6 flex items-center justify-center space-x-4 text-gray-500">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span className="text-sm">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
