import React, { useState, useEffect } from 'react'; 

function OrdersPage() {
  const [orders, setOrders] = useState([
    { id: 'ORD001', customerName: 'ABC', productName: 'Laptop', amount: 999.99, status: 'Shipped', targetDeliveryDate: '2025-03-15', paymentStatus: 'Paid' },
    { id: 'ORD002', customerName: 'EFG', productName: 'Smartphone', amount: 599.99, status: 'Pending', targetDeliveryDate: '2025-03-20', paymentStatus: 'Pending' },
    { id: 'ORD003', customerName: 'XYZ', productName: 'Headphones', amount: 99.99, status: 'Delivered', targetDeliveryDate: '2025-03-10', paymentStatus: 'Paid' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showEditForm, setShowEditForm] = useState(false); 
  const [editingOrder, setEditingOrder] = useState(null); 

  useEffect(() => {
    console.log('Orders state updated:', orders);
  }, [orders]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const handleEdit = (order = null) => {
    setEditingOrder(order ? { ...order } : {
      id: `ORD${Math.floor(Math.random() * 1000)}`,
      customerName: '',
      productName: '',
      amount: '',
      status: 'Pending',
      targetDeliveryDate: '',
      paymentStatus: 'Pending',
    });
    setShowEditForm(true);
    console.log('Opening form for order:', order || 'New Order'); 
  };

  const handleCancel = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingOrder(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || '' : value,
    }));
    console.log('Input changed:', name, value); 
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    console.log('Submitting order:', editingOrder); 
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <button
          onClick={() => handleEdit()} 
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200"
        >
          Create Order
        </button>
      </div>

      <div className="flex mb-6 gap-4">
        <div className="relative flex-1">
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
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-gray-700">Order ID</th>
            <th className="py-2 px-4 text-gray-700">Customer Name</th>
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
              <td className="py-2 px-4 text-gray-600">{order.customerName}</td>
              <td className="py-2 px-4 text-gray-600">{order.productName}</td>
              <td className="py-2 px-4 text-gray-600">${order.amount.toFixed(2)}</td>
              <td className="py-2 px-4 text-gray-600">{order.status}</td>
              <td className="py-2 px-4 text-gray-600">{order.targetDeliveryDate}</td>
              <td className="py-2 px-4 text-gray-600">{order.paymentStatus}</td>
              <td className="py-2 px-4 text-gray-600">
                <button
                  onClick={() => handleEdit(order)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCancel(order.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
                  value={editingOrder ? editingOrder.customerName : ''}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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

export default OrdersPage;