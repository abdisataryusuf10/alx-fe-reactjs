const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Advanced Routing</h1>
      <p>This demo shows advanced routing techniques in React Router.</p>
      <div className="features">
        <div className="feature">
          <h3>Nested Routes</h3>
          <p>Check out the Profile page for nested routing examples.</p>
        </div>
        <div className="feature">
          <h3>Dynamic Routing</h3>
          <p>Visit the Blog page to see dynamic routes in action.</p>
        </div>
        <div className="feature">
          <h3>Protected Routes</h3>
          <p>The Profile page is protected and requires authentication.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;