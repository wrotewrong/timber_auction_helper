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
import { getCatalogStatusRequest } from './redux/catalogRedux';
import {
  getOffersStatusRequest,
  getCompaniesStatusRequest,
} from './redux/contractsRedux';
import { importStatusRequest } from './redux/statusRedux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(importStatusRequest());
    dispatch(getCatalogStatusRequest());
    dispatch(getOffersStatusRequest());
    dispatch(getCompaniesStatusRequest());
  }, [dispatch]);

  return (
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
  );
};

export default App;
