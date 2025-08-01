import { Navbar, NavbarBrand } from "reactstrap";
import NucampLogo from '../app/assets/img/logo.png'; 
// Adjusted import path to match project structure. 
// Was './app/assets/img/logo.png' in original code.

const Header = () => {
  return (
    <Navbar dark color="primary" sticky="top" expand="md">
      <NavbarBrand href="/">
        <img src={NucampLogo} alt="nucamp logo" />
      </NavbarBrand>
    </Navbar>
  );
};

export default Header;
