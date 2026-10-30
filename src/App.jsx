
import React, { useState, useEffect } from 'react';
import './App.css';

const API = 'http://localhost:8080/api/posts';

function App() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  // Fetch existing scheduled posts
  const fetchPosts = async () => {
    try {
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Invalid posts response from backend');
      }

      setPosts(data);
      setError('');
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Unable to load posts. Check your backend.');
    } finally {
      setFetching(false);
    }
  };

  // Fetch only once when the component loads
  useEffect(() => {
    console.log('APP LOADED');
    console.log('FETCHING POSTS...');

    fetchPosts();
  }, []);

  // Schedule a new post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() || !scheduleTime || loading) {
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${API}/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: content.trim(),
          scheduledTime: new Date(scheduleTime).toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to schedule post: ${response.status}`);
      }

      setContent('');
      setScheduleTime('');

      await fetchPosts();

    } catch (err) {
      console.error('Scheduling error:', err);
      setError(err.message || 'Unable to schedule post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">

      <header className="header">
        <h1>Kafka Event-Driven Publisher</h1>
        <p>
          Schedule your posts and watch the Kafka pipeline in action!
        </p>
      </header>

      <main className="main-content">

        {/* Schedule Post Form */}
        <section className="form-section">
          <h2>Schedule a New Post</h2>

          <form onSubmit={handleSubmit} className="post-form">

            <div className="form-group">
              <label>Post Content:</label>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                required
              />
            </div>

            <div className="form-group">
              <label>Schedule Time:</label>

              <input
                type="datetime-local"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Scheduling...' : 'Schedule Post'}
            </button>

          </form>

          {error && (
            <p className="error-message">{error}</p>
          )}

        </section>

        {/* Scheduled Posts */}
        <section className="posts-section">

          <div className="post-header">
            <h2>Scheduled Posts</h2>

            <button
              type="button"
              onClick={fetchPosts}
              disabled={fetching}
            >
              Refresh
            </button>
          </div>

          <div className="posts-grid">

            {fetching ? (
              <p>Loading posts...</p>
            ) : posts.length === 0 ? (
              <p className="no-posts">
                No posts scheduled yet.
              </p>
            ) : (
              posts.map((post) => {

                const status = String(
                  post.status || 'PENDING'
                ).toLowerCase();

                return (
                  <div
                    key={post.id}
                    className={`post-card status-${status}`}
                  >

                    <div className="post-header">
                      <span className="post-id">
                        ID: {post.id}
                      </span>

                      <span className="post-status">
                        {post.status || 'PENDING'}
                      </span>
                    </div>

                    <div className="post-content">
                      {post.content}
                    </div>

                    <div className="post-time">
                      Scheduled:{' '}
                      {post.scheduledTime
                        ? new Date(
                            post.scheduledTime
                          ).toLocaleString()
                        : 'Not available'}
                    </div>

                  </div>
                );
              })
            )}

          </div>
        </section>

      </main>
    </div>
  );
}

export default App;
