import { useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const API = process.env.REACT_APP_API_BASE_URL;

        const res = await axios.get(`${API}/blogs`);
        setBlogs(res.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
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
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Blog Posts
        </h2>

        {blogs.length === 0 ? (
          <p className="text-center text-white text-lg">No blog posts yet.</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-md rounded-lg p-6 mb-6 transition transform hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-xl font-bold mb-2 text-purple-700">
                {blog.title}
              </h3>
              <p className="text-gray-700 mb-4">{blog.content}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>By {blog.author?.name || 'Unknown'}</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogList;
