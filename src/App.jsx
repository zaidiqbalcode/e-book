import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import BookDetails from './pages/BookDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
              fontWeight: '500',
            },
            success: {
              iconTheme: {
                primary: '#0ea5e9',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
