const About = () => {
  return (
    <div className="about">
      <h1>About This Project</h1>
      <p>This project demonstrates advanced routing techniques in React using React Router.</p>
      
      <div className="about-sections">
        <section>
          <h2>Features Implemented</h2>
          <ul>
            <li>Nested Routing</li>
            <li>Dynamic Routing</li>
            <li>Protected Routes</li>
            <li>Route Parameters</li>
            <li>Programmatic Navigation</li>
          </ul>
        </section>
        
        <section>
          <h2>Technologies Used</h2>
          <ul>
            <li>React 18</li>
            <li>React Router DOM v6</li>
            <li>CSS Modules</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;