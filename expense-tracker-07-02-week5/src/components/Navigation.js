import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { NavLink as RRLink } from 'react-router-dom'; // Use React Router's NavLink 
// instead of ReactStrap's
/**
 * Navigation component for the application.
 * 
 * @variable {boolean} isOpen - State to manage the collapse of the navbar.
 * @function toggle - Function to toggle the isOpen state.
 * 
 * @returns {JSX.Element} The Navigation bar component.
 */
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand='md'>
        <NavbarBrand href="/">Expense Tracker</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink to="/" tag={RRLink}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/expenses" tag={RRLink}>Expenses</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;