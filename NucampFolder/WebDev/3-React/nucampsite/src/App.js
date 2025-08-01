import CampsitesList from 'features/campsites/CampsitesList';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import NucampLogo from './app/assets/img/logo.png';
import './App.css';

function App() {
  return (
    <div>
      <Navbar dark color='primary' sticky='top' expand='md'>
               <Container>
                    <NavbarBrand href='/'>
                        <img src={NucampLogo} alt='nucamp logo' />
                    </NavbarBrand>
                </Container>
            </Navbar>
            <main>
                <CampsitesList /> { /* The CampsitesList component will render the list of campsites. 
                It takes care of mapping over the CAMPSITES array and displaying each campsite in a card format. That is why
                it is used here instead of manually creating each CampsiteCard. Previously, we had to do that for each campsite
                using the CampsiteCard component directly. Recall <CampsiteCard campsite={CAMPSITES[0]} /> and importing
                the CampsiteCard component at the top, which is no longer necessary. It was replaced by the CampsitesList component. */ }
            </main>
    </div>
  );
}

export default App;
