import { useEffect } from 'react';
import {useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import CampsitesDirectoryPage from './pages/CampsitesDirectoryPage';
import CampsiteDetailPage from './pages/CampsiteDetailPage';
import { fetchCampsites } from './features/campsites/campsitesSlice';
import { fetchPartners } from 'features/partners/partnersSlice';  
import './App.css';
// By convention, set up a dispatch variable to receive the useDispatch hook
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Don't dispatch async network thunks while running unit tests; they
    // trigger jsdom/network handles that prevent Jest from exiting.
    if (process.env.NODE_ENV !== 'test') {
      dispatch(fetchCampsites());
      dispatch(fetchPartners());
    }
  }, [dispatch]);

  return (
    <div>
      <Header />
        <Routes>
          {/* The path is the URL path that will render the component */}
          {/* The element is the component that will be rendered */}
          {/* The path can be a string or a regular expression */}
          {/* The element can be a React component or a function that returns a React component */}
          {/* The path can also include parameters, which are indicated by a colon */}
          {/* For example, the path 'directory/:campsiteId' will match the URL
          /directory/1, where 1 is the campsiteId parameter */}
          {/* The element will be rendered when the path matches the URL */}
          {/* The HomePage component will be rendered when the URL path is '/' */}
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />

          {/* The CampsitesDirectoryPage component will be rendered when the URL path is just '/directory' */}
          {/* The CampsiteDetailPage component will be rendered when the URL path is '/directory/:campsiteId' */}
          {/* The CampsiteDetailPage component will receive the campsiteId parameter from the URL */}
          <Route path='/directory' element={<CampsitesDirectoryPage />} />
          {/* The colon lets React Router know that this is a route parameter name, 
          not a static part of the URL, i.e., it is not a literal part of the path 
          like the word 'directory' or the word 'contact' */}
          <Route path='/directory/:campsiteId' element={<CampsiteDetailPage />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;




