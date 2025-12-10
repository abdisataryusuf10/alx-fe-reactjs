import { useParams, useNavigate } from 'react-router-dom';

const blogContent = {
  'getting-started-react-router': {
    title: 'Getting Started with React Router',
    content: 'This post covers the basics of React Router...',
    author: 'John Doe',
    date: '2024-01-15'
  },
  'advanced-routing-techniques': {
    title: 'Advanced Routing Techniques',
    content: 'Learn about nested routes, protected routes, and more...',
    author: 'Jane Smith',
    date: '2024-01-20'
  },
  'authentication-react-apps': {
    title: 'Authentication in React Apps',
    content: 'Implementing authentication with React Router...',
    author: 'Bob Johnson',
    date: '2024-01-25'
  },
  'performance-optimization': {
    title: 'Performance Optimization',
    content: 'Tips for optimizing your React Router applications...',
    author: 'Alice Brown',
    date: '2024-01-30'
  },
  'state-management-solutions': {
    title: 'State Management Solutions',
    content: 'Managing state in complex routing scenarios...',
    author: 'Charlie Wilson',
    date: '2024-02-01'
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogContent[slug];

  if (!post) {
    return (
      <div className="blog-post not-found">
        <h1>Post Not Found</h1>
        <p>The blog post you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/blog')}>Back to Blog</button>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <button onClick={() => navigate('/blog')} className="back-button">
        ← Back to Blog
      </button>
      
      <article>
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>By {post.author}</span>
          <span>{post.date}</span>
        </div>
        
        <div className="post-content">
          <p>{post.content}</p>
          <p>This is a detailed article about {post.title.toLowerCase()}.</p>
          <p>More content would go here in a real blog post...</p>
        </div>
      </article>
      
      <div className="post-navigation">
        <h3>More Articles</h3>
        <p>Check out other posts in our blog section.</p>
      </div>
    </div>
  );
};

export default BlogPost;