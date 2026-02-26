import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const { orderId, amount, customerDetails } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center animate-fade-in">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful! 🎉</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase</p>

        {/* Order Details */}
        {orderId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono text-gray-800">{orderId}</span>
              </div>
              {amount && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-semibold text-gray-800">₹{amount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-medium">Completed</span>
              </div>
            </div>
          </div>
        )}

        {/* Customer Details */}
        {customerDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-3">Delivery Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="text-gray-800">{customerDetails.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-800">{customerDetails.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="text-gray-800">{customerDetails.phone}</span>
              </div>
              <div className="pt-2 border-t">
                <span className="text-gray-600">Address:</span>
                <p className="text-gray-800 mt-1">
                  {customerDetails.address}<br />
                  {customerDetails.city}, {customerDetails.state} - {customerDetails.pincode}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
          <div className="flex items-start space-x-2">
            <svg
              className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-blue-800">
              Your e-books are now available in your library. A confirmation email has
              been sent to your registered email address.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/shop"
            className="block w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="block w-full bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
