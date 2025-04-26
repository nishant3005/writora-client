import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const API = process.env.REACT_APP_API_BASE_URL;

  const fetchBlogs = async () => {
    setFetchLoading(true);
    try {
      const res = await axios.get(`${API}/blogs`);
      setBlogs(res.data);
    } catch (err) {
      toast.error('Error fetching blogs');
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchBlogs();
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      if (editId) {
        await axios.put(`${API}/blogs/${editId}`, form, config);
        toast.success('Blog updated');
      } else {
        await axios.post(`${API}/blogs`, form, config);
        toast.success('Blog created');
      }

      setForm({ title: '', content: '' });
      setEditId(null);
      fetchBlogs();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error submitting blog');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setEditId(blog._id);
    setForm({ title: blog.title, content: blog.content });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/blogs/${id}`, config);
      toast.success('Blog deleted');
      fetchBlogs();
    } catch (err) {
      toast.error('Error deleting blog');
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <p className="text-center text-lg text-red-600 mt-10">
        Access denied. Admins only.
      </p>
    );
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
        <div className="text-white text-xl font-semibold animate-pulse">
          Loading blogs...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Admin Dashboard
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 mb-10 space-y-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={form.title}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          />
          <textarea
            name="content"
            placeholder="Blog Content"
            value={form.content}
            onChange={handleChange}
            disabled={loading}
            required
            rows={4}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold text-white rounded transition ${
              loading ? 'bg-purple-300' : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {loading ? 'Saving...' : editId ? 'Update Blog' : 'Create Blog'}
          </button>
        </form>

        <h3 className="text-2xl font-bold text-white mb-6">Your Blogs</h3>

        {blogs
          .filter((b) => b.author._id === user.id)
          .map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md p-6 mb-6 transition transform hover:scale-105 hover:shadow-xl"
            >
              <h4 className="text-xl font-bold text-purple-700 mb-2">
                {blog.title}
              </h4>
              <p className="text-gray-700 mb-4">{blog.content}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(blog)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
