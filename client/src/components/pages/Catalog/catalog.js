import { FileForm } from '../../features/FileForm/FileForm';
import { FileDownloadButton } from '../../features/FileDownloadButton/FileDownloadButton';
import { useSelector } from 'react-redux';
import { getCatalog } from '../../../redux/catalogRedux';

export const Catalog = () => {
  const catalog = useSelector(getCatalog);

  return (
    <div>
      Catalog
      <FileForm fileType={'catalog'}></FileForm>
      {catalog ? (
        <FileDownloadButton
          fileEndpointPath={'/catalog/download'}
          fileName={'Katalog.docx'}
        ></FileDownloadButton>
      ) : null}
    </div>
  );
};
