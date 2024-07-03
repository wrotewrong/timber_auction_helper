import { useDispatch, useSelector } from 'react-redux';
import { addContracts, getContracts } from '../../../redux/contractsRedux';

export const Contracts = () => {
  const contracts = useSelector(getContracts);

  const dispatch = useDispatch();

  const createContracts = () => {
    console.log('works');
    dispatch(addContracts());
  };

  return (
    <div>
      Contracts
      <button onClick={createContracts}>Stwórz umowy</button>
      {contracts?.contracts?.length > 0 ? (
        <p>{`sporządzono umów: ${contracts?.contracts?.length}, dla:`}</p>
      ) : null}
      <ul>
        {contracts?.contracts?.map((contract) => (
          <li>{contract.buyer.name}</li>
        ))}
      </ul>
    </div>
  );
};
