import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple admin authentication (you can improve this)
  const handleAdminLogin = (e) => {
    e.preventDefault();
    // You can change this password
    if (adminPassword === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      fetchDashboardData();
    } else {
      toast.error('Invalid admin password');
    }
  };

  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch dashboard stats
      const statsResponse = await fetch('https://backend-books-production-c7bc.up.railway.app/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || 'demo-admin-token'}`,
        },
      });
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.data);
      }

      // Fetch all orders
      const ordersResponse = await fetch('https://backend-books-production-c7bc.up.railway.app/api/admin/orders', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || 'demo-admin-token'}`,
        },
      });
      
      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        setOrders(ordersData.data);
      }

      // Fetch all users
      const usersResponse = await fetch('https://backend-books-production-c7bc.up.railway.app/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || 'demo-admin-token'}`,
        },
      });
      
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(usersData.data);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`https://backend-books-production-c7bc.up.railway.app/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || 'demo-admin-token'}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success('Order status updated');
        fetchDashboardData();
      } else {
        toast.error('Failed to update order status');
      }
    } catch (error) {
      toast.error('Error updating order status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setAdminPassword('');
    navigate('/');
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 to-purple-700 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Enter password to continue</p>
          </div>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Readify E-Book Store</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Books</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBooks || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers || 0}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'orders'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Orders ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'users'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Users ({users.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.paymentId || order._id?.substring(0, 8)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.customerDetails?.fullName}</div>
                          <div className="text-sm text-gray-500">{order.customerDetails?.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{order.totalAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.transactionId || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              order.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => {
                              const details = `
Order ID: ${order._id}
Customer: ${order.customerDetails?.fullName}
Email: ${order.customerDetails?.email}
Phone: ${order.customerDetails?.phone}
Address: ${order.customerDetails?.address}, ${order.customerDetails?.city}
Books: ${order.books?.map(b => b.title).join(', ')}
Total: ₹${order.totalAmount}
Transaction ID: ${order.transactionId}
                              `;
                              alert(details);
                            }}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {orders.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No orders yet</p>
                  </div>
                )}
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {users.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No users yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
