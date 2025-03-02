import React, { useState, useEffect } from 'react';

function CustomerQueriesPage() {
  const [currentCustomer] = useState({ id: 'CUST001', name: 'ABC' }); 
  const [orders] = useState([
    { id: 'ORD001', customerId: 'CUST001', customerName: 'ABC', productName: 'Laptop', amount: 999.99, status: 'Shipped', targetDeliveryDate: '2025-03-15', paymentStatus: 'Paid' },
    { id: 'ORD004', customerId: 'CUST001', customerName: 'ABC', productName: 'Mouse', amount: 29.99, status: 'Pending', targetDeliveryDate: '2025-03-18', paymentStatus: 'Pending' },
  ]);

  const [queries, setQueries] = useState([
    { queryId: 'QRY001', orderId: 'ORD001', customerId: 'CUST001', customerName: 'ABC', description: 'Issue with Laptop delivery', status: 'Open', adminResponse: '' },
    { queryId: 'QRY004', orderId: 'ORD004', customerId: 'CUST001', customerName: 'ABC', description: 'Delay in Mouse shipping', status: 'Open', adminResponse: '' },
    { queryId: 'QRY005', orderId: 'ORD001', customerId: 'CUST001', customerName: 'ABC', description: 'Laptop battery issue', status: 'Open', adminResponse: '' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const customerOrderIds = new Set(orders.map(order => order.id));
  const filteredQueries = queries.filter(query => {
    const matchesSearch = query.queryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || query.status === filterStatus;
    const isValidOrder = customerOrderIds.has(query.orderId); 
    return matchesSearch && matchesStatus && isValidOrder;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newQuery, setNewQuery] = useState(null);

  const handleCreateQuery = () => {
    setNewQuery({
      queryId: `QRY${Math.floor(Math.random() * 1000)}`,
      orderId: '', 
      customerId: currentCustomer.id,
      customerName: currentCustomer.name,
      description: '',
      status: 'Open',
      adminResponse: '',
    });
    setShowCreateForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuery(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitQuery = (e) => {
    e.preventDefault();
    if (newQuery && newQuery.orderId && newQuery.description && customerOrderIds.has(newQuery.orderId)) {
      setQueries(prev => [...prev, { ...newQuery, status: 'Open', adminResponse: '' }]);
      setShowCreateForm(false);
      setNewQuery(null);
    } else {
      alert('Please select a valid Order ID and enter a query description.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Queries</h1>

      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Queries..."
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
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
        <button
          onClick={handleCreateQuery}
          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 text-sm transition-all duration-200"
        >
          Create Query
        </button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-gray-700">Query ID</th>
            <th className="py-2 px-4 text-gray-700">Order ID</th>
            <th className="py-2 px-4 text-gray-700">Query Description</th>
            <th className="py-2 px-4 text-gray-700">Query Status</th>
            <th className="py-2 px-4 text-gray-700">Admin Response</th>
          </tr>
        </thead>
        <tbody>
          {filteredQueries.map((query, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4 text-gray-600">{query.queryId}</td>
              <td className="py-2 px-4 text-gray-600">{query.orderId}</td>
              <td className="py-2 px-4 text-gray-600">{query.description}</td>
              <td className="py-2 px-4 text-gray-600">{query.status}</td>
              <td className="py-2 px-4 text-gray-600">{query.adminResponse || 'Pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredQueries.length === 0 && (
        <p className="text-gray-500 mt-4">No queries found.</p>
      )}

      {showCreateForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[400px] max-w-[90%]">
            <h2 className="text-xl font-bold mb-4">Create New Query</h2>
            <form onSubmit={handleSubmitQuery} className="space-y-3">
              <div>
                <label className="block text-gray-700 text-sm mb-1">Query ID</label>
                <input
                  type="text"
                  name="queryId"
                  value={newQuery?.queryId || ''}
                  readOnly
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={newQuery?.customerName || currentCustomer.name}
                  readOnly
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Order ID</label>
                <select
                  name="orderId"
                  value={newQuery?.orderId || ''}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">Select an Order</option>
                  {orders.map(order => (
                    <option key={order.id} value={order.id}>
                      {order.id} - {order.productName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Query Description</label>
                <textarea
                  name="description"
                  value={newQuery?.description || ''}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-24"
                  placeholder="Describe your query here..."
                />
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewQuery(null);
                  }}
                  className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                >
                  Create Query
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerQueriesPage;