import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/FormikForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Advanced Form Handling in React</h1>
        <p className="subtitle">Comparing Controlled Components vs Formik Implementation</p>
      </header>
      
      <main>
        <section className="form-section">
          <RegistrationForm />
        </section>
        
        <div className="separator">
          <span>VS</span>
        </div>
        
        <section className="form-section">
          <FormikForm />
        </section>
      </main>
      
      <footer className="comparison">
        <h3>Implementation Comparison</h3>
        <div className="comparison-grid">
          <div className="comparison-item">
            <h4>Controlled Components</h4>
            <ul>
              <li>Manual state management with useState</li>
              <li>Custom validation logic</li>
              <li>Event handlers for each input</li>
              <li>More boilerplate code</li>
              <li>Full control over validation timing</li>
            </ul>
          </div>
          
          <div className="comparison-item">
            <h4>Formik with Yup</h4>
            <ul>
              <li>Automatic state management</li>
              <li>Yup validation schema</li>
              <li>Built-in Form, Field, ErrorMessage components</li>
              <li>Less boilerplate code</li>
              <li>Touched state tracking</li>
              <li>Better for complex forms</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;