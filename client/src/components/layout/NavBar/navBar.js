import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const NavBar = () => {
  return (
    <Navbar>
      <Nav>
        <Nav.Link as={NavLink} to='/'>
          Strona Główna
        </Nav.Link>
        <Nav.Link as={NavLink} to='/catalog'>
          Katalog
        </Nav.Link>
        <Nav.Link as={NavLink} to='/offers'>
          Oferty
        </Nav.Link>
        <Nav.Link as={NavLink} to='/contracts'>
          Umowy
        </Nav.Link>
        <Nav.Link as={NavLink} to='/removal'>
          Usunięcie
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};
