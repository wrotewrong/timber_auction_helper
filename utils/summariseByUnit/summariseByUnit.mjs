import BigNumber from 'bignumber.js';
import bigNumberFormat from '../bigNumberFormat.mjs';

const summariseByUnit = (arrayToSummarise) => {
  const summaryArray = [];
  arrayToSummarise.forEach((product) => {
    for (let unit of summaryArray) {
      if (unit.summaryForestDistrict === product.forestDistrict) {
        unit.unitVolume = new BigNumber(unit.unitVolume).plus(
          new BigNumber(product.volume)
        );
        unit.unitPrice = new BigNumber(unit.unitPrice).plus(
          new BigNumber(product.finalPriceTotal)
        );
        return;
      }
    }
    summaryArray.push({
      summaryForestDistrict: product.forestDistrict,
      unitVolume: product.volume,
      unitPrice: product.finalPriceTotal,
    });
  });

  summaryArray.sort((a, b) => {
    return a.summaryForestDistrict.localeCompare(b.summaryForestDistrict);
  });

  return summaryArray.map((product) => {
    return {
      summaryForestDistrict: product.summaryForestDistrict,
      unitVolume: bigNumberFormat(product.unitVolume),
      unitPrice: bigNumberFormat(product.unitPrice),
    };
  });
};

export default summariseByUnit;
