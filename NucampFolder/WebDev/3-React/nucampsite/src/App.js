import Header from './components/Header';
import Footer from './components/Footer';
import CampsitesDirectoryPage from 'pages/CampsitesDirectoryPage';
// was "import CampsitesList from 'features/campsites/CampsitesList';" 
// but after finishing CampsiteDetail.js it is imported from the features/campsites directory


import './App.css';

function App() {
  return (
    <div>
      <Header />
      <main>
        <CampsitesDirectoryPage /> 
        
      </main>
      <Footer />
    </div>
  );
}

export default App;
