import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';
import OrdersPage from './components/OrdersPage';
import QueriesPage from './components/QueriesPage';
import CustomerList from './components/CustomerList';
import CustomerDashboard from './components/CustomerDashboard';
import CustomerOrdersPage from './components/CustomerOrdersPage';
import CustomerQueriesPage from './components/CustomerQueriesPage';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(null);

  useEffect(() => {
    console.log('User Role:', userRole);
  }, [userRole]);

  const handleLoginSubmit = (email) => {
    const role = email.includes('admin') ? 'admin' : 'customer';
    setUserRole(role);
    const navigate = useNavigate();
    navigate(role === 'admin' ? '/admin-dashboard' : '/customer-dashboard');
  };

  const handleSignupSubmit = (type) => {
    setUserRole(type);
    const navigate = useNavigate();
    navigate(type === 'admin' ? '/admin-dashboard' : '/customer-dashboard');
  };

  return (
    <Router>
      <Navbar
        userRole={userRole}
        setUserRole={setUserRole}
        setShowLogin={() => setShowLogin(true)}
        setShowSignup={(role) => setShowSignup(role)}
        setActiveSection={setActiveSection}
      />
      <Routes>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route
          path="/orders"
          element={
            userRole === 'admin' ? <OrdersPage /> : <Navigate to="/" replace />
          }
        /> 
        <Route
          path="/queries"
          element={
            userRole === 'admin' ? <QueriesPage /> : <Navigate to="/" replace />
          }
        /> 
        <Route
          path="/customer-list"
          element={
            userRole === 'admin' ? <CustomerList /> : <Navigate to="/" replace />
          }
        /> 
        <Route
          path="/customer-dashboard"
          element={
            userRole === 'customer' ? <CustomerDashboard /> : <Navigate to="/" replace />
          }
        /> 
        <Route
          path="/customer-orders"
          element={
            userRole === 'customer' ? <CustomerOrdersPage /> : <Navigate to="/" replace />
          }
        /> 
        <Route
          path="/customer-queries"
          element={
            userRole === 'customer' ? <CustomerQueriesPage /> : <Navigate to="/" replace />
          }
        /> 
        <Route
          path="/"
          element={
            !userRole ? ( 
              <div className="container mx-auto p-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800">Welcome to Intute.ai</h1>
                <p className="text-gray-600 mt-4">Please log in or sign up to access the dashboard.</p>
              </div>
            ) : (
              userRole === 'admin' ? <AdminDashboard /> : <CustomerDashboard />
            )
          }
        />
      </Routes>
      {showLogin && (
        <LoginModal
          setShowLogin={setShowLogin}
          setUserRole={(role) => setUserRole(role)}
          onSubmit={(email) => handleLoginSubmit(email)}
        />
      )}
      {showSignup && (
        <SignupModal
          type={showSignup}
          setShowSignup={setShowSignup}
          setUserRole={(role) => setUserRole(role)}
          onSubmit={(type) => handleSignupSubmit(type)}
        />
      )}
    </Router>
  );
}

export default App;