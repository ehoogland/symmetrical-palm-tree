import Header from './components/Header';
import CampsitesList from 'features/campsites/CampsitesList';
import Footer from './components/Footer';


import './App.css';

function App() {
  return (
    <div>
      <Header />
      <main>
        <CampsitesList />
        { /* The CampsitesList component renders the list of campsites.
            It takes care of mapping over the CAMPSITES array and displaying each campsite in a card format. That is why
            it is used here instead of manually creating each CampsiteCard. Previously, we had to do that for each campsite
            using the CampsiteCard component directly. Recall starting with <CampsiteCard campsite={CAMPSITES[0]} /> and importing
            the CampsiteCard component at the top, which is no longer necessary. It was replaced by the CampsitesList component. */ }
      </main>
      <Footer />
    </div>
  );
}

export default App;
