import React, { useState, useEffect } from 'react';

function CustomerOrdersPage() {
  const [currentCustomer] = useState({ id: 'CUST001', name: 'ABC' }); 
  const [orders, setOrders] = useState([
    { id: 'ORD001', customerId: 'CUST001', customerName: 'ABC', productName: 'Laptop', amount: 999.99, status: 'Shipped', targetDeliveryDate: '2025-03-15', paymentStatus: 'Paid' },
    { id: 'ORD004', customerId: 'CUST001', customerName: 'ABC', productName: 'Mouse', amount: 29.99, status: 'Pending', targetDeliveryDate: '2025-03-18', paymentStatus: 'Pending' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const [showEditForm, setShowEditForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const handleEdit = (order = null) => {
    setEditingOrder(order ? { ...order } : {
      id: `ORD${Math.floor(Math.random() * 1000)}`,
      customerId: currentCustomer.id,
      customerName: currentCustomer.name,
      productName: '',
      amount: '',
      status: 'Pending',
      targetDeliveryDate: '',
      paymentStatus: 'Pending',
    });
    setShowEditForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingOrder(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || '' : value,
    }));
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (editingOrder && editingOrder.customerName && editingOrder.productName && editingOrder.amount && editingOrder.targetDeliveryDate) {
      const isNewOrder = !orders.some(order => order.id === editingOrder.id);
      if (isNewOrder) {
        setOrders(prev => [...prev, { ...editingOrder, amount: Number(editingOrder.amount) || 0 }]);
      } else {
        setOrders(prev => prev.map(order => 
          order.id === editingOrder.id ? { ...editingOrder, amount: Number(editingOrder.amount) || 0 } : order
        ));
      }
      setShowEditForm(false);
      setEditingOrder(null);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h1>

      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Orders..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="Shipped">Shipped</option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
        </select>
        <button
          onClick={() => handleEdit()}
          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 text-sm transition-all duration-200"
        >
          Create Order
        </button>
      </div>

      {/* Orders Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-gray-700">Order ID</th>
            <th className="py-2 px-4 text-gray-700">Product Name</th>
            <th className="py-2 px-4 text-gray-700">Amount</th>
            <th className="py-2 px-4 text-gray-700">Status</th>
            <th className="py-2 px-4 text-gray-700">Target Delivery Date</th>
            <th className="py-2 px-4 text-gray-700">Payment Status</th>
            <th className="py-2 px-4 text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4 text-gray-600">{order.id}</td>
              <td className="py-2 px-4 text-gray-600">{order.productName}</td>
              <td className="py-2 px-4 text-gray-600">${order.amount.toFixed(2)}</td>
              <td className="py-2 px-4 text-gray-600">{order.status}</td>
              <td className="py-2 px-4 text-gray-600">{order.targetDeliveryDate}</td>
              <td className="py-2 px-4 text-gray-600">{order.paymentStatus}</td>
              <td className="py-2 px-4 text-gray-600">
                <button
                  onClick={() => handleEdit(order)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredOrders.length === 0 && (
        <p className="text-gray-500 mt-4">No orders found.</p>
      )}

      {showEditForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[400px] max-w-[90%]">
            <h2 className="text-xl font-bold mb-4">{editingOrder ? 'Edit Order' : 'Create New Order'}</h2>
            <form onSubmit={handleSubmitEdit} className="space-y-3">
              <div>
                <label className="block text-gray-700 text-sm mb-1">Order ID</label>
                <input
                  type="text"
                  name="id"
                  value={editingOrder ? editingOrder.id : `ORD${Math.floor(Math.random() * 1000)}`}
                  readOnly
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={editingOrder ? editingOrder.customerName : currentCustomer.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  readOnly 
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={editingOrder ? editingOrder.productName : ''}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Amount ($)</label>
                <input
                  type="number"
                  name="amount"
                  value={editingOrder ? editingOrder.amount : ''}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Status</label>
                <select
                  name="status"
                  value={editingOrder ? editingOrder.status : 'Pending'}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Target Delivery Date</label>
                <input
                  type="date"
                  name="targetDeliveryDate"
                  value={editingOrder ? editingOrder.targetDeliveryDate : ''}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Payment Status</label>
                <select
                  name="paymentStatus"
                  value={editingOrder ? editingOrder.paymentStatus : 'Pending'}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingOrder(null);
                  }}
                  className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                >
                  {editingOrder ? 'Save Changes' : 'Create Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerOrdersPage;