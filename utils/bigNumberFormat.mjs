import BigNumber from 'bignumber.js';

export const bigNumberDocxFormat = {
  prefix: '',
  decimalSeparator: ',',
  groupSeparator: ' ',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
  suffix: '',
};

const bigNumberFormat = (number) => {
  return new BigNumber(number).toFormat(2, bigNumberDocxFormat);
};

export default bigNumberFormat;
