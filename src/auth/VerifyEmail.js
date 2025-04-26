import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const [verifying, setVerifying] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    const email = query.get('email');

    const verify = async () => {
      try {
        const API = process.env.REACT_APP_API_BASE_URL;
        const res = await axios.get(
          `${API}/auth/verify-email?token=${token}&email=${email}`
        );
        toast.success(res.data.message);
        navigate('/login');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Verification failed');
      } finally {
        setVerifying(false);
      }
    };

    verify();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 p-6">
      <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          {verifying ? 'Verifying your email...' : 'Redirecting...'}
        </h2>
        <p className="text-gray-600">
          Please wait while we verify your email address.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
