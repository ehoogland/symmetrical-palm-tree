import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ColorSchemesExample() {
  return (
    <>
      {/* React Bootstrap Navbar for navigation. Uses "as" prop to render React Router Link, as opposed to
      <a> tags, to ensure that the navigation is handled by React Router. */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Tradeable Stocks</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/random">Random</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
