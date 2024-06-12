import BigNumber from 'bignumber.js';

const excludeRandomOffer = (offers) => {
  const index = Math.floor(Math.random() * offers.length);
  if (offers.length > 1) {
    console.log(
      `Spośród ${
        offers.length
      } ofert, którym brakowało najwięcej m3 (${new BigNumber(
        offers[index].minVolume
      ).minus(
        new BigNumber(offers[index].volumeWon)
      )} m3), losowo wykluczono ofertę firmy nip: ${offers[index].nip} `
    );
  } else if (offers.length === 1) {
    console.log(
      `Wykluczono ofertę nip: ${
        offers[index].nip
      }, której brakowało najwięcej m3 (${new BigNumber(
        offers[index].minVolume
      ).minus(new BigNumber(offers[index].volumeWon))} m3)`
    );
  }

  return offers[index];
};
export default excludeRandomOffer;
