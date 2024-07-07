import { useDispatch, useSelector } from 'react-redux';
import { addContracts, getContracts } from '../../../redux/contractsRedux';
import { FileDownloadButton } from '../../features/FileDownloadButton/FileDownloadButton';

export const Contracts = () => {
  const contracts = useSelector(getContracts);

  const dispatch = useDispatch();

  const createContracts = () => {
    dispatch(addContracts());
  };

  return (
    <div>
      Contracts
      <button onClick={createContracts}>Stwórz umowy</button>
      {contracts?.contracts?.length > 0 ? (
        <>
          <p>{`sporządzono umów: ${contracts?.contracts?.length}, dla:`}</p>
          <ul>
            {contracts?.contracts?.map((contract) => (
              <li key={contract.buyer.nip}>{contract.buyer.name}</li>
            ))}
          </ul>
          <FileDownloadButton
            fileEndpointPath={'/contracts/zip'}
            fileName={'umowy.zip'}
          ></FileDownloadButton>
        </>
      ) : null}
    </div>
  );
};
