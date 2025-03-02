import React, { useState, useEffect } from 'react';

function CustomerDashboard() {
  const [customers] = useState([
    { id: 'CUST001', name: 'ABC' },
    { id: 'CUST002', name: 'EFG' },
    { id: 'CUST003', name: 'XYZ' },
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD001', customerId: 'CUST001', customerName: 'ABC', productName: 'Laptop', amount: 999.99, status: 'Shipped', targetDeliveryDate: '2025-03-15', paymentStatus: 'Paid' },
    { id: 'ORD002', customerId: 'CUST002', customerName: 'EFG', productName: 'Smartphone', amount: 599.99, status: 'Pending', targetDeliveryDate: '2025-03-20', paymentStatus: 'Pending' },
    { id: 'ORD003', customerId: 'CUST003', customerName: 'XYZ', productName: 'Headphones', amount: 99.99, status: 'Delivered', targetDeliveryDate: '2025-03-10', paymentStatus: 'Paid' },
    { id: 'ORD004', customerId: 'CUST001', customerName: 'ABC', productName: 'Mouse', amount: 29.99, status: 'Pending', targetDeliveryDate: '2025-03-18', paymentStatus: 'Pending' },
  ]);

  const [queries, setQueries] = useState([
    { queryId: 'QRY001', orderId: 'ORD001', customerId: 'CUST001', customerName: 'ABC', description: 'Issue with product delivery', status: 'Open', adminResponse: '' },
    { queryId: 'QRY002', orderId: 'ORD002', customerId: 'CUST002', customerName: 'EFG', description: 'Question about payment status', status: 'In Progress', adminResponse: 'Checking payment details...' },
    { queryId: 'QRY003', orderId: 'ORD003', customerId: 'CUST003', customerName: 'XYZ', description: 'Product damaged on arrival', status: 'Resolved', adminResponse: 'Replacement shipped on 2025-03-01' },
    { queryId: 'QRY004', orderId: 'ORD004', customerId: 'CUST001', customerName: 'ABC', description: 'Delay in shipping', status: 'Open', adminResponse: '' },
  ]);

  const [currentCustomer, setCurrentCustomer] = useState(null);

  useEffect(() => {
    const customerEmail = 'user@example.com'; 
    const customer = customers.find(c => c.id === 'CUST001'); 
    if (customer) {
      setCurrentCustomer(customer);
    }
  }, [customers]);

  const customerOrders = currentCustomer ? orders.filter(order => order.customerId === currentCustomer.id) : [];
  const customerQueries = currentCustomer ? queries.filter(query => query.customerId === currentCustomer.id) : [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Customer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* My Orders Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">My Orders</h2>
          <p className="text-gray-600 mb-4">View and manage your orders here.</p>
          {customerOrders.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-gray-700">Order ID</th>
                  <th className="py-2 px-4 text-gray-700">Product Name</th>
                  <th className="py-2 px-4 text-gray-700">Amount</th>
                  <th className="py-2 px-4 text-gray-700">Status</th>
                  <th className="py-2 px-4 text-gray-700">Target Delivery Date</th>
                  <th className="py-2 px-4 text-gray-700">Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {customerOrders.map((order, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4 text-gray-600">{order.id}</td>
                    <td className="py-2 px-4 text-gray-600">{order.productName}</td>
                    <td className="py-2 px-4 text-gray-600">${order.amount.toFixed(2)}</td>
                    <td className="py-2 px-4 text-gray-600">{order.status}</td>
                    <td className="py-2 px-4 text-gray-600">{order.targetDeliveryDate}</td>
                    <td className="py-2 px-4 text-gray-600">{order.paymentStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No orders found.</p>
          )}
        </div>

        {/* My Queries Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">My Queries</h2>
          <p className="text-gray-600 mb-4">Check your submitted queries and responses.</p>
          {customerQueries.length > 0 ? (
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
                {customerQueries.map((query, index) => (
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
          ) : (
            <p className="text-gray-500">No queries found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;