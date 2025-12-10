import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home';
import About from './components/About';
import BlogList from './components/Blog/BlogList';
import BlogPost from './components/Blog/BlogPost';
import Profile from './components/Profile/Profile';
import ProfileDetails from './components/Profile/ProfileDetails';
import ProfileSettings from './components/Profile/ProfileSettings';
import Login from './components/Auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  // In a real app, this would come from authentication context
  const isAuthenticated = true; // Change to false to test protected route

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="login" element={<Login />} />
          
          <Route path="profile" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }>
            <Route index element={<ProfileDetails />} />
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;