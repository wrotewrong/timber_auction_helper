import { FileForm } from '../../features/FileForm/FileForm';
import { FileDownloadButton } from '../../features/FileDownloadButton/FileDownloadButton';
import { useSelector } from 'react-redux';
import { getCatalog } from '../../../redux/catalogRedux';
import Spinner from 'react-bootstrap/Spinner';
import { getRequest } from '../../../redux/requestRedux';

export const Catalog = () => {
  const catalog = useSelector(getCatalog);
  const request = useSelector((state) => getRequest(state, 'CATALOG_REQUEST'));

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
            <div className='col-4'>
              <p className='fw-bold fs-4 mb-0'>Załącz plik z losami:</p>
              <FileForm fileType={'catalog'}></FileForm>
              {catalog?.products?.length > 0 ? (
                <div>
                  <p className='mt-0 fw-bold text-success'>{`losy dodane: ${catalog?.products?.length}`}</p>
                  <FileDownloadButton
                    fileEndpointPath={'/catalog/download'}
                    fileName={'Katalog.docx'}
                    buttonName={'katalog'}
                  ></FileDownloadButton>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
