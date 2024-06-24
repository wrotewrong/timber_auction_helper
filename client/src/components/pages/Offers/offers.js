import { FileForm } from '../../features/FileForm/FileForm';
import { useSelector } from 'react-redux';
import { getOffers, getCompanies } from '../../../redux/contractsRedux';

export const Offers = () => {
  const offers = useSelector(getOffers);
  const companies = useSelector(getCompanies);

  return (
    <div>
      Oferty: <FileForm fileType={'offers'}></FileForm>
      {offers ? <p>dodano oferty</p> : null}
      Kontrahenci: <FileForm fileType={'companies'}></FileForm>
      {companies ? <p>dodano kontrahentów</p> : null}
    </div>
  );
};
