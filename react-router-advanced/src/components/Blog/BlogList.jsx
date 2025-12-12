import { Link } from 'react-router-dom';

const blogPosts = [
  { id: 1, title: 'Getting Started with React Router', slug: 'getting-started-react-router' },
  { id: 2, title: 'Advanced Routing Techniques', slug: 'advanced-routing-techniques' },
  { id: 3, title: 'Authentication in React Apps', slug: 'authentication-react-apps' },
  { id: 4, title: 'Performance Optimization', slug: 'performance-optimization' },
  { id: 5, title: 'State Management Solutions', slug: 'state-management-solutions' },
];

const BlogList = () => {
  return (
    <div className="blog-list">
      <h1>Blog Posts</h1>
      <div className="posts-grid">
        {blogPosts.map(post => (
          <Link 
            key={post.id} 
            to={`/blog/${post.slug}`}
            className="post-card"
          >
            <h3>{post.title}</h3>
            <p>Click to read more about {post.title.toLowerCase()}</p>
            <span className="read-more">Read Article →</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;