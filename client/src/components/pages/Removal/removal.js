import { useDispatch } from 'react-redux';
import { deleteAllContractsDataRequest } from '../../../redux/contractsRedux';
import { deleteAllCatalogDataRequest } from '../../../redux/catalogRedux';
import { importStatusRequest } from '../../../redux/statusRedux';
import Button from 'react-bootstrap/esm/Button';

export const Removal = () => {
  const dispatch = useDispatch();

  const deleteData = async (e) => {
    e.preventDefault();
    await dispatch(deleteAllContractsDataRequest());
    await dispatch(deleteAllCatalogDataRequest());
    await dispatch(importStatusRequest());
  };

  return (
    <div className='container text-center'>
      <p className='fw-bold fs-4'>Usuń wszystkie dane i pliki:</p>
      <Button variant='outline-success' onClick={deleteData}>
        Usuń
      </Button>
    </div>
  );
};
