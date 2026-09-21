import React, { useState } from 'react';

const PostList = ({ posts, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');

  const handleEditClick = (post) => {
    setEditingId(post.id);
    setEditContent(post.content || '');
  };

  const handleSaveClick = (id, platform) => {
    onUpdate(id, { platform, content: editContent });
    setEditingId(null);
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  if (posts.length === 0) {
    return <div className="no-posts">No posts yet. Start composing!</div>;
  }

  return (
    <div className="post-list">
      <h2>Recent Posts</h2>
      {posts.map((post) => {
        const platform = post.platform || 'Unknown';
        const content = post.content || '';

        return (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <span className={`platform-badge ${platform.toLowerCase()}`}>
                {platform}
              </span>
              <div className="post-actions">
                {editingId === post.id ? (
                  <>
                    <button className="action-btn save" onClick={() => handleSaveClick(post.id, platform)}>Save</button>
                    <button className="action-btn cancel" onClick={handleCancelClick}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="action-btn edit" onClick={() => handleEditClick(post)}>Edit</button>
                    <button className="action-btn delete" onClick={() => onDelete(post.id)}>Delete</button>
                  </>
                )}
              </div>
            </div>

            <div className="post-body">
              {editingId === post.id ? (
                <textarea
                  value={editContent}
                  onChange={(event) => setEditContent(event.target.value)}
                  rows="4"
                  className="edit-textarea"
                />
              ) : (
                <p>{content}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
