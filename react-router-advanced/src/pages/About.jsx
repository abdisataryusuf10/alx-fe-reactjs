import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="about-header">
        <h1>About Advanced Routing</h1>
        <p className="about-subtitle">
          A demonstration of React Router v6 features and patterns
        </p>
      </div>

      <div className="about-content">
        <section className="section">
          <h2>Routing Concepts Implemented</h2>
          <div className="concepts-grid">
            <div className="concept">
              <h3>🔒 Protected Routes</h3>
              <p>
                Routes that require authentication. Unauthorized users are 
                redirected to the login page.
              </p>
              <code>{"<ProtectedRoute>"}</code>
            </div>

            <div className="concept">
              <h3>📁 Nested Routes</h3>
              <p>
                Hierarchical routing where child routes render within parent 
                layouts (Profile → Settings).
              </p>
              <code>{"<Route path='profile'>"}</code>
            </div>

            <div className="concept">
              <h3>🔄 Dynamic Routes</h3>
              <p>
                Routes with parameters that can change (blog/:postId). 
                Accessed via useParams() hook.
              </p>
              <code>{"<Route path='blog/:postId'>"}</code>
            </div>

            <div className="concept">
              <h3>🧭 Programmatic Navigation</h3>
              <p>
                Using useNavigate() hook to navigate programmatically 
                based on application logic.
              </p>
              <code>{"const navigate = useNavigate()"}</code>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Authentication Flow</h2>
          <div className="auth-flow">
            <div className="flow-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Login</h3>
                <p>User enters credentials or uses demo accounts</p>
              </div>
            </div>

            <div className="flow-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Auth Context</h3>
                <p>Context API manages user state globally</p>
              </div>
            </div>

            <div className="flow-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Route Protection</h3>
                <p>ProtectedRoute component checks auth status</p>
              </div>
            </div>

            <div className="flow-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Access Control</h3>
                <p>Authorized users access protected routes</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Technical Implementation</h2>
          <div className="tech-details">
            <div className="tech-item">
              <h4>React Router v6</h4>
              <ul>
                <li>Declarative routing configuration</li>
                <li>Nested route support</li>
                <li>Relative links and navigation</li>
                <li>Route parameters and search params</li>
              </ul>
            </div>

            <div className="tech-item">
              <h4>Context API</h4>
              <ul>
                <li>Global authentication state</li>
                <li>User session persistence</li>
                <li>Protected route access control</li>
                <li>User settings management</li>
              </ul>
            </div>

            <div className="tech-item">
              <h4>Best Practices</h4>
              <ul>
                <li>Code splitting with lazy loading</li>
                <li>Route-based code splitting</li>
                <li>Error boundaries for routes</li>
                <li>Loading states for async routes</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;