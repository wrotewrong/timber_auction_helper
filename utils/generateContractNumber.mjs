import {
  contractDate,
  contractNumberForestDistrictNumber,
  contractNumberRdlpNumber,
} from '../backendConfig.mjs';

const generateContractNumber = (number) => {
  const years = contractDate.getFullYear().toString();
  return `A${years.substring(
    2
  )}${contractNumberRdlpNumber}${contractNumberForestDistrictNumber}${number
    .toString()
    .padStart(3, '0')}`;
};

export default generateContractNumber;
