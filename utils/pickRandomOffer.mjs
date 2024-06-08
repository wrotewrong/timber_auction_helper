const pickRandomOffer = (product, offers) => {
  const index = Math.floor(Math.random() * offers.length);
  if (offers.length > 1) {
    console.log(
      `LOS nr ${product.productNumber} - losowo wybrano ofertę firmy nip: ${offers[index].nip}, która zaoferowała: ${offers[index].bid} PLN (spośród ${offers.length} takich samych ofert)`
    );
  } else {
    console.log(
      `LOS nr ${product.productNumber} - wybrano najwyższą ofertę firmy nip: ${offers[index].nip}, która zaoferowała: ${offers[index].bid} PLN`
    );
  }

  return offers[index];
};
export default pickRandomOffer;
