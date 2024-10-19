import { FileForm } from '../../features/FileForm/FileForm';
import { useSelector } from 'react-redux';
import {
  getOffers,
  getCompanies,
  estimateWinnerRequest,
  getEstimationResult,
} from '../../../redux/contractsRedux';
import { useDispatch } from 'react-redux';
import { getStatus } from '../../../redux/statusRedux';
import { FileDownloadButton } from '../../features/FileDownloadButton/FileDownloadButton';
import Button from 'react-bootstrap/esm/Button';
import { getCatalog } from '../../../redux/catalogRedux';
import Spinner from 'react-bootstrap/esm/Spinner';
import { getRequest } from '../../../redux/requestRedux';

export const Offers = () => {
  const offers = useSelector(getOffers);
  const companies = useSelector(getCompanies);
  const catalog = useSelector(getCatalog);
  const status = useSelector(getStatus);
  const estimationResult = useSelector(getEstimationResult);
  const dispatch = useDispatch();
  const request = useSelector((state) => getRequest(state, 'OFFERS_REQUEST'));

  const estimateWinner = (e) => {
    e.preventDefault();
    dispatch(estimateWinnerRequest());
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
      <div>
        <div className='container text-center'>
          <div className='d-flex justify-content-center'>
            <div className='col-4 me-4'>
              <p className='fw-bold fs-4 mb-0'>Załącz plik z ofertami:</p>
              <FileForm fileType={'offers'}></FileForm>
              {offers?.offers?.length > 0 ? (
                <p className='fw-bold text-success'>{`oferty dodane: ${offers?.offers?.length}`}</p>
              ) : null}
              {offers?.message !== 'OK' &&
              offers?.message !== 'Not found...' &&
              offers?.message !== undefined ? (
                <div>
                  <p className='mt-0 fw-bold text-danger'>
                    wystąpił błąd: zweryfikuj dane i spróbuj ponownie
                  </p>
                </div>
              ) : null}
            </div>
            <div className='col-4 ms-4'>
              <p className='fw-bold fs-4 mb-0'>Załącz plik z kontrahentami:</p>
              <FileForm fileType={'companies'}></FileForm>
              {companies?.companies?.length > 0 ? (
                <p className='fw-bold text-success'>{`kontrahenci dodani: ${companies?.companies?.length}`}</p>
              ) : null}
              {companies?.message !== 'OK' &&
              companies?.message !== 'Not found...' &&
              companies?.message !== undefined ? (
                <div>
                  <p className='mt-0 fw-bold text-danger'>
                    wystąpił błąd: zweryfikuj dane i spróbuj ponownie
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='d-flex justify-content-center pt-5'>
            <div className='col-6'>
              {offers?.offers?.length > 0 &&
              companies?.companies?.length > 0 &&
              catalog?.products?.length > 0 ? (
                <>
                  <Button variant='outline-success' onClick={estimateWinner}>
                    Rozstrzygnij submisję
                  </Button>
                </>
              ) : null}

              {status?.winners ? (
                <>
                  <p className='fw-bold text-success'>
                    Submisja rozstrzygnięta
                  </p>
                  <FileDownloadButton
                    fileEndpointPath={'/contracts/logger'}
                    fileName={'logger.txt'}
                    buttonName={'podsumowanie'}
                  ></FileDownloadButton>
                </>
              ) : null}
              {estimationResult?.message !== 'OK' &&
              estimationResult?.message !== 'Winners already estimated' &&
              estimationResult?.message !== undefined ? (
                <div>
                  <p className='mt-0 fw-bold text-danger'>
                    wystąpił błąd: ponownie rozstrzygnij submisję
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
