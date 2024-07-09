import { FileForm } from '../../features/FileForm/FileForm';
import { FileDownloadButton } from '../../features/FileDownloadButton/FileDownloadButton';
import { useSelector } from 'react-redux';
import { getCatalog } from '../../../redux/catalogRedux';

export const Catalog = () => {
  const catalog = useSelector(getCatalog);

  return (
    <div>
      <FileForm fileType={'catalog'}></FileForm>
      {catalog?.products?.length > 0 ? (
        <div>
          <p>{`losy dodane: ${catalog?.products?.length}`}</p>
          <FileDownloadButton
            fileEndpointPath={'/catalog/download'}
            fileName={'Katalog.docx'}
            buttonName={'katalog'}
          ></FileDownloadButton>
        </div>
      ) : null}
    </div>
  );
};
