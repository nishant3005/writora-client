import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-lg p-10 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          Welcome to Writora
        </h1>
        {user ? (
          <p className="text-gray-700 text-lg mb-6">
            <Link to="/blogs" className="text-purple-600 hover:underline">
              Go to Blogs
            </Link>
          </p>
        ) : (
          <p className="text-gray-700 text-lg mb-6">
            <Link to="/login" className="text-purple-600 hover:underline">
              Login
            </Link>{' '}
            to view and manage blogs.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
