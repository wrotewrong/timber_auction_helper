import {
  contractDate,
  contractNumberForestDistrictNumber,
  contractNumberRdlpNumber,
} from '../backendConfig.mjs';

const generateContractNumber = (number) => {
  return `A${contractDate.getFullYear()}${contractNumberRdlpNumber}${contractNumberForestDistrictNumber}${number
    .toString()
    .padStart(3, '0')}`;
};

export default generateContractNumber;
