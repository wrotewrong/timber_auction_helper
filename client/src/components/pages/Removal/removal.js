import { useDispatch } from 'react-redux';
import { deleteAllContractsDataRequest } from '../../../redux/contractsRedux';
import { deleteAllCatalogDataRequest } from '../../../redux/catalogRedux';
import { importStatusRequest } from '../../../redux/statusRedux';
import Button from 'react-bootstrap/esm/Button';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useSelector } from 'react-redux';
import { getRequest } from '../../../redux/requestRedux';

export const Removal = () => {
  const dispatch = useDispatch();
  const request = useSelector((state) => getRequest(state, 'REMOVE_REQUEST'));

  const deleteData = async (e) => {
    e.preventDefault();
    await dispatch(deleteAllContractsDataRequest());
    await dispatch(deleteAllCatalogDataRequest());
    await dispatch(importStatusRequest());
  };

  if (!request || request.success) {
    return (
      <div className='container text-center'>
        <p className='fw-bold fs-4'>Usuń wszystkie dane i pliki:</p>
        <Button variant='outline-success' onClick={deleteData}>
          Usuń
        </Button>
      </div>
    );
  } else {
    return (
      <Spinner
        animation='border'
        role='status'
        className='d-block mx-auto'
      ></Spinner>
    );
  }
};
