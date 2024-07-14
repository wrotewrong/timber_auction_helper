import { useDispatch } from 'react-redux';
import { deleteAllContractsDataRequest } from '../../../redux/contractsRedux';
import { deleteAllCatalogDataRequest } from '../../../redux/catalogRedux';
import { importStatusRequest } from '../../../redux/statusRedux';

export const Removal = () => {
  const dispatch = useDispatch();

  const deleteData = async (e) => {
    e.preventDefault();
    await dispatch(deleteAllContractsDataRequest());
    await dispatch(deleteAllCatalogDataRequest());
    await dispatch(importStatusRequest());
  };

  return (
    <div>
      Removal<button onClick={deleteData}>Usuń dane</button>
    </div>
  );
};
