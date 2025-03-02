import React, { useState, useEffect } from 'react';

function QueriesPage() {
  const [queries, setQueries] = useState([
    { queryId: 'QRY001', orderId: 'ORD001', customerName: 'ABC', description: 'Issue with product delivery', status: 'Open', adminResponse: '' },
    { queryId: 'QRY002', orderId: 'ORD002', customerName: 'EFG', description: 'Question about payment status', status: 'In Progress', adminResponse: 'Checking payment details...' },
    { queryId: 'QRY003', orderId: 'ORD003', customerName: 'XYZ', description: 'Product damaged on arrival', status: 'Resolved', adminResponse: 'Replacement shipped on 2025-03-01' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showRespondForm, setShowRespondForm] = useState(false); 
  const [respondingQuery, setRespondingQuery] = useState(null); 
  const [responseText, setResponseText] = useState(''); 
  const [queryStatus, setQueryStatus] = useState(''); 

  useEffect(() => {
    console.log('Queries state updated:', queries);
  }, [queries]);

  const filteredQueries = queries.filter(query => {
    const matchesSearch = query.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.queryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || query.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleRespond = (query) => {
    setRespondingQuery({ ...query });
    setResponseText(query.adminResponse || ''); 
    setQueryStatus(query.status || 'Open'); 
    setShowRespondForm(true);
    console.log('Responding to query:', query); 
  };

  const handleResponseChange = (e) => {
    setResponseText(e.target.value);
    console.log('Response changed:', e.target.value); 
  };

  const handleStatusChange = (e) => {
    setQueryStatus(e.target.value);
    console.log('Status changed:', e.target.value); 
  };

  const handleSubmitResponse = (e) => {
    e.preventDefault();
    console.log('Submitting response for query:', respondingQuery, 'Response:', responseText, 'Status:', queryStatus); // Debug log
    if (respondingQuery && responseText.trim() && queryStatus) {
      setQueries(prev => prev.map(query => 
        query.queryId === respondingQuery.queryId ? { ...query, adminResponse: responseText, status: queryStatus } : query
      ));
      setShowRespondForm(false);
      setRespondingQuery(null);
      setResponseText('');
      setQueryStatus('');
    } else {
      alert('Please enter a response and select a status.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Queries</h1>
      </div>

      <div className="flex mb-6 gap-4">
        <div className="relative flex-1">
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
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-gray-700">Query ID</th>
            <th className="py-2 px-4 text-gray-700">Order ID</th>
            <th className="py-2 px-4 text-gray-700">Customer Name</th>
            <th className="py-2 px-4 text-gray-700">Query Description</th>
            <th className="py-2 px-4 text-gray-700">Query Status</th>
            <th className="py-2 px-4 text-gray-700">Admin Response</th>
            <th className="py-2 px-4 text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredQueries.map((query, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4 text-gray-600">{query.queryId}</td>
              <td className="py-2 px-4 text-gray-600">{query.orderId}</td>
              <td className="py-2 px-4 text-gray-600">{query.customerName}</td>
              <td className="py-2 px-4 text-gray-600">{query.description}</td>
              <td className="py-2 px-4 text-gray-600">{query.status}</td>
              <td className="py-2 px-4 text-gray-600">{query.adminResponse || 'Pending'}</td>
              <td className="py-2 px-4 text-gray-600">
                <button
                  onClick={() => handleRespond(query)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Respond to Query
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showRespondForm && respondingQuery && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[400px] max-w-[90%]">
            <h2 className="text-xl font-bold mb-4">Respond to Query #{respondingQuery.queryId}</h2>
            <form onSubmit={handleSubmitResponse} className="space-y-3">
              <div>
                <label className="block text-gray-700 text-sm mb-1">Response</label>
                <textarea
                  name="response"
                  value={responseText}
                  onChange={handleResponseChange}
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-24"
                  placeholder="Enter your response here..."
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Query Status</label>
                <select
                  name="status"
                  value={queryStatus}
                  onChange={handleStatusChange}
                  required
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowRespondForm(false);
                    setRespondingQuery(null);
                    setResponseText('');
                    setQueryStatus('');
                  }}
                  className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                >
                  Submit Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default QueriesPage;