import { Routes, Route } from 'react-router-dom';
import { Main } from './components/layout/Main/main';
import { Home } from './components/pages/Home/home';
import { Catalog } from './components/pages/Catalog/catalog';
import { Contracts } from './components/pages/Contracts/contracts';
import { Offers } from './components/pages/Offers/offers';
import { NotFound } from './components/pages/NotFound/notFound';
import { Removal } from './components/pages/Removal/removal';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadCatalogRequest } from './redux/catalogRedux';
import {
  loadOffersRequest,
  loadCompaniesRequest,
  loadContractsRequest,
} from './redux/contractsRedux';
import { importStatusRequest } from './redux/statusRedux';
import Container from 'react-bootstrap/Container';

const App = () => {
  useEffect(() => {
    document.title = 'Submisja';
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(importStatusRequest());
    dispatch(loadCatalogRequest());
    dispatch(loadOffersRequest());
    dispatch(loadCompaniesRequest());
    dispatch(loadContractsRequest());
  }, [dispatch]);

  return (
    <Container>
      <Main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/contracts' element={<Contracts />} />
          <Route path='/removal' element={<Removal />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Main>
    </Container>
  );
};

export default App;
