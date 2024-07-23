import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const NavBar = () => {
  return (
    <Navbar
      bg='success'
      variant='dark'
      className='h-100 mb-4 rounded text-center'
    >
      <Nav className='mx-auto fs-5'>
        <Nav.Link className='px-3' as={NavLink} to='/'>
          Strona Główna
        </Nav.Link>
        <Nav.Link className='px-3' as={NavLink} to='/catalog'>
          Katalog
        </Nav.Link>
        <Nav.Link className='px-3' as={NavLink} to='/offers'>
          Oferty
        </Nav.Link>
        <Nav.Link className='px-3' as={NavLink} to='/contracts'>
          Umowy
        </Nav.Link>
        <Nav.Link className='px-3' as={NavLink} to='/removal'>
          Usunięcie
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};
