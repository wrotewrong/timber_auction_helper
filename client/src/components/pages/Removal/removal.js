import { useDispatch } from 'react-redux';
import { deleteAllContractsDataRequest } from '../../../redux/contractsRedux';
import { deleteAllCatalogDataRequest } from '../../../redux/catalogRedux';

export const Removal = () => {
  const dispatch = useDispatch();

  const deleteData = (e) => {
    e.preventDefault();
    dispatch(deleteAllContractsDataRequest());
    dispatch(deleteAllCatalogDataRequest());
  };

  return (
    <div>
      Removal<button onClick={deleteData}>Usuń dane</button>
    </div>
  );
};
