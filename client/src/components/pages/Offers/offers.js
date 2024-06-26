import { FileForm } from '../../features/FileForm/FileForm';
import { useSelector } from 'react-redux';
import {
  getOffers,
  getCompanies,
  estimateWinnerRequest,
} from '../../../redux/contractsRedux';
import { useDispatch } from 'react-redux';
import { getStatus } from '../../../redux/statusRedux';

export const Offers = () => {
  const offers = useSelector(getOffers);
  const companies = useSelector(getCompanies);
  const status = useSelector(getStatus);
  const dispatch = useDispatch();

  const estimateWinner = (e) => {
    e.preventDefault();
    dispatch(estimateWinnerRequest());
  };

  return (
    <div>
      Oferty: <FileForm fileType={'offers'}></FileForm>
      {offers ? <p>dodano oferty</p> : null}
      Kontrahenci: <FileForm fileType={'companies'}></FileForm>
      {companies ? <p>dodano kontrahentów</p> : null}
      <button onClick={estimateWinner}>Przypisz zwycięzców</button>
      {status?.winners ? <p>określono zwycięzców</p> : null}
    </div>
  );
};
