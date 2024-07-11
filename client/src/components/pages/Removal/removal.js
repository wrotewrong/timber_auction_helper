import { useDispatch } from 'react-redux';
import { deleteAllContractsDataRequest } from '../../../redux/contractsRedux';

export const Removal = () => {
  const dispatch = useDispatch();

  const deleteData = (e) => {
    e.preventDefault();

    dispatch(deleteAllContractsDataRequest());
  };

  return (
    <div>
      Removal<button onClick={deleteData}>Usuń dane</button>
    </div>
  );
};
