import React from 'react';

function AdminDashboard() {
  const orders = [
    { customerName: 'ABC', targetDeliveryDate: '2025-03-15' },
    { customerName: 'EFG', targetDeliveryDate: '2025-03-20' },
  ];

  const queries = [
    { customerName: 'ABC', dateOfQueryRaised: '2025-02-28' },
    { customerName: 'EFG', dateOfQueryRaised: '2025-03-01' },
  ];

  const recentActivity = [
    { activity: 'Order Shipped', dateAndTime: '2025-02-28 10:00' },
    { activity: 'Query Resolved', dateAndTime: '2025-03-01 14:30' },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Orders Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Orders</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 text-gray-700">Customer Name</th>
                <th className="py-2 text-gray-700">Target Delivery Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 text-gray-600">{order.customerName}</td>
                  <td className="py-2 text-gray-600">{order.targetDeliveryDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Queries Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Queries</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 text-gray-700">Customer Name</th>
                <th className="py-2 text-gray-700">Raised On</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((query, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 text-gray-600">{query.customerName}</td>
                  <td className="py-2 text-gray-600">{query.dateOfQueryRaised}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Recent Activity</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 text-gray-700">Query Status</th>
                <th className="py-2 text-gray-700">Date And Time</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 text-gray-600">{activity.activity}</td>
                  <td className="py-2 text-gray-600">{activity.dateAndTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;