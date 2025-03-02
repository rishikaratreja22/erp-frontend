import React from 'react';

function LoginModal({ setShowLogin, setUserRole, navigate }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    setUserRole(email.includes('admin') ? 'admin' : 'customer');
    setShowLogin(false);
    if (email.includes('admin')) {
      navigate('/admin-dashboard');
    } else {
      navigate('/customer-dashboard');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" required />
          <input type="password" name="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" required />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">Login</button>
        </form>
        <button onClick={() => setShowLogin(false)} className="mt-2 text-blue-600">Close</button>
      </div>
    </div>
  );
}

export default LoginModal;