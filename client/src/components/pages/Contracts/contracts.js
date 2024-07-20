import { useDispatch, useSelector } from 'react-redux';
import { addContracts, getContracts } from '../../../redux/contractsRedux';
import { FileDownloadButton } from '../../features/FileDownloadButton/FileDownloadButton';
import Button from 'react-bootstrap/esm/Button';
import Spinner from 'react-bootstrap/esm/Spinner';
import { getRequest } from '../../../redux/requestRedux';

export const Contracts = () => {
  const contracts = useSelector(getContracts);
  const request = useSelector((state) =>
    getRequest(state, 'CONTRACTS_REQUEST')
  );

  const dispatch = useDispatch();

  const createContracts = () => {
    dispatch(addContracts());
  };

  if (!request || !request.success) {
    return (
      <Spinner
        animation='border'
        role='status'
        className='d-block mx-auto'
      ></Spinner>
    );
  } else {
    return (
      <div className='container text-center'>
        <div className='d-flex justify-content-center'>
          <div className='col-8'>
            <p className='fw-bold fs-4'>Stwórz umowy i załączniki:</p>
            <Button variant='outline-success' onClick={createContracts}>
              Generuj pliki
            </Button>
            {contracts?.contracts?.length > 0 ? (
              <div className='text-left'>
                <p className='fw-bold text-success'>{`umowy sporządzone: ${contracts?.contracts?.length}`}</p>
                <ul className='text-left' style={{ listStyle: 'none' }}>
                  {contracts?.contracts?.map((contract) => (
                    <li key={contract.buyer.nip}>
                      {contract.number} - {contract.buyer.name}
                    </li>
                  ))}
                </ul>
                <FileDownloadButton
                  fileEndpointPath={'/contracts/zip'}
                  fileName={'umowy.zip'}
                  buttonName={'pliki'}
                ></FileDownloadButton>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
};
