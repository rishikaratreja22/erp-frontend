import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom'; 
import { FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import logo from '../assets/intute-ai_logo.jpeg';

function Navbar({ userRole, setUserRole, setShowLogin, setShowSignup, setActiveSection }) {
  const handleLogout = () => {
    setUserRole(null);
    setActiveSection('');
  };

  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    if (path === '/admin-dashboard') setActiveSection('admin-dashboard');
    else if (path === '/orders') setActiveSection('orders');
    else if (path === '/queries') setActiveSection('queries');
    else if (path === '/customer-list') setActiveSection('customer-list');
    else if (path === '/customer-dashboard') setActiveSection('customer-dashboard');
    else if (path === '/customer-orders') setActiveSection('customer-orders');
    else if (path === '/customer-queries') setActiveSection('customer-queries');
    else setActiveSection('');
  }, [location, setActiveSection]);

  return (
    <nav className="bg-gray-800 py-4 pl-0 pr-4 text-white shadow-lg">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Intute AI Logo"
            className="h-12 w-auto"
          />
        </div>

        <div className="flex items-center space-x-6">
          {userRole === 'admin' && (
            <div className="hidden md:flex space-x-6">
              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) =>
                  `text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-200 ${isActive ? 'text-white bg-gray-700' : ''}`
                }
                onClick={() => setActiveSection('admin-dashboard')}
              >
                Admin Dashboard
              </NavLink>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-200 ${isActive ? 'text-white bg-gray-700' : ''}`
                }
                onClick={() => setActiveSection('orders')}
              >
                Orders
              </NavLink>
              <NavLink
                to="/queries"
                className={({ isActive }) =>
                  `text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-200 ${isActive ? 'text-white bg-gray-700' : ''}`
                }
                onClick={() => setActiveSection('queries')}
              >
                Queries
              </NavLink>
              <NavLink
                to="/customer-list"
                className={({ isActive }) =>
                  `text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-200 ${isActive ? 'text-white bg-gray-700' : ''}`
                }
                onClick={() => setActiveSection('customer-list')}
              >
                Customer List
              </NavLink>
            </div>
          )}

          {userRole === 'customer' && (
            <div className="hidden md:flex space-x-6">
              <NavLink
                to="/customer-dashboard"
                className={({ isActive }) =>
                  `text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-200 ${isActive ? 'text-white bg-gray-700' : ''}`
                }
                onClick={() => setActiveSection('customer-dashboard')}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/customer-orders"
                className={({ isActive }) =>
                  `text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-200 ${isActive ? 'text-white bg-gray-700' : ''}`
                }
                onClick={() => setActiveSection('customer-orders')}
              >
                Orders
              </NavLink>
              <NavLink
                to="/customer-queries"
                className={({ isActive }) =>
                  `text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-200 ${isActive ? 'text-white bg-gray-700' : ''}`
                }
                onClick={() => setActiveSection('customer-queries')}
              >
                Queries
              </NavLink>
            </div>
          )}

          <div className="flex items-center space-x-4">
            {!userRole ? (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-200"
                >
                  <FaSignInAlt className="mr-2" /> Login
                </button>
                <button
                  onClick={() => setShowSignup('admin')}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all duration-200"
                >
                  <FaUserPlus className="mr-2" /> Admin Signup
                </button>
                <button
                  onClick={() => setShowSignup('customer')}
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-all duration-200"
                >
                  <FaUserPlus className="mr-2" /> Customer Signup
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-200"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {userRole && (
        <div className="md:hidden mt-2">
          <div className="flex flex-col space-y-2">
            {userRole === 'admin' && (
              <>
                <NavLink
                  to="/admin-dashboard"
                  className={({ isActive }) =>
                    `text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md ${isActive ? 'text-white bg-gray-700' : ''}`
                  }
                  onClick={() => setActiveSection('admin-dashboard')}
                >
                  Admin Dashboard
                </NavLink>
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    `text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md ${isActive ? 'text-white bg-gray-700' : ''}`
                  }
                  onClick={() => setActiveSection('orders')}
                >
                  Orders
                </NavLink>
                <NavLink
                  to="/queries"
                  className={({ isActive }) =>
                    `text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md ${isActive ? 'text-white bg-gray-700' : ''}`
                  }
                  onClick={() => setActiveSection('queries')}
                >
                  Queries
                </NavLink>
                <NavLink
                  to="/customer-list"
                  className={({ isActive }) =>
                    `text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md ${isActive ? 'text-white bg-gray-700' : ''}`
                  }
                  onClick={() => setActiveSection('customer-list')}
                >
                  Customer List
                </NavLink>
              </>
            )}
            {userRole === 'customer' && (
              <>
                <NavLink
                  to="/customer-dashboard"
                  className={({ isActive }) =>
                    `text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md ${isActive ? 'text-white bg-gray-700' : ''}`
                  }
                  onClick={() => setActiveSection('customer-dashboard')}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/customer-orders"
                  className={({ isActive }) =>
                    `text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md ${isActive ? 'text-white bg-gray-700' : ''}`
                  }
                  onClick={() => setActiveSection('customer-orders')}
                >
                  Orders
                </NavLink>
                <NavLink
                  to="/customer-queries"
                  className={({ isActive }) =>
                    `text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md ${isActive ? 'text-white bg-gray-700' : ''}`
                  }
                  onClick={() => setActiveSection('customer-queries')}
                >
                  Queries
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;