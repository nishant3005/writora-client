import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-purple-600 font-bold text-xl hover:underline"
          >
            Writora
          </Link>
          <Link
            to="/blogs"
            className="text-gray-700 hover:text-purple-600 transition"
          >
            Blogs
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="text-gray-700 hover:text-purple-600 transition"
            >
              Admin
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/signup"
                className="text-gray-700 hover:text-purple-600 transition"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="text-gray-700 hover:text-purple-600 transition"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-600 hidden sm:block">
                Hello, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
