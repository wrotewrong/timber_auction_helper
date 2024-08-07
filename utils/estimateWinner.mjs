const estimateWinner = (products, offers, companies) => {
  for (let product of products) {
    for (let offer of offers) {
      if (
        product.productNumber === offer.productNumber &&
        offer.bid > product.maxBid.offer
      ) {
        product.maxBid.offer = offer.bid;
        product.maxBid.nip = offer.nip;
        product.maxBid.company = offer.bidder;
        product.finalTotalPrice = product.volume * offer.bid;
      }
    }
  }

  for (let company of companies) {
    for (let product of products) {
      if (company.companyName === product.maxBid.company) {
        company.volumeWon += product.volume;
        company.productsWon.push(product.productNumber);
      }
    }
  }

  for (let company of companies) {
    if (company.volumeWon < company.minVolume) {
      company.productsWon = [];
    }
  }

  return [products, companies];
};

export default estimateWinner;
