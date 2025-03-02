import React from 'react';

function SignupModal({ type, setShowSignup, setUserRole, navigate }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserRole(type); 
    setShowSignup(null); 
    navigate(type === 'admin' ? '/admin-dashboard' : '/customer-dashboard');
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4">{type === 'admin' ? 'Admin Signup' : 'Customer Signup'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" className="w-full p-2 mb-4 border rounded" required />
          <input type="email" name="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" required />
          <input type="password" name="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" required />
          {type === 'admin' && (
            <input type="text" name="adminKey" placeholder="Admin Key" className="w-full p-2 mb-4 border rounded" required />
          )}
          <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">Signup</button>
        </form>
        <button onClick={() => setShowSignup(null)} className="mt-2 text-blue-600">Close</button>
      </div>
    </div>
  );
}

export default SignupModal;