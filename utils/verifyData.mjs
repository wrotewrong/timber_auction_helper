export const verifyData = (dataType, data) => {
  if (dataType === 'products') {
    const productNumber = [];
    for (let product of data) {
      if (product.productNumber.includes('.')) {
        throw new Error('Product number must not be a number');
      }

      if (productNumber.includes(product.productNumber)) {
        throw new Error('Product number must be unique');
      }
      productNumber.push(product.productNumber);
    }
  }

  if (dataType === 'offers') {
    const uniqueProductNumberAndNip = [];
    for (let offer of data) {
      if (offer.productNumber.includes('.')) {
        throw new Error('Product number must not be a number');
      }

      if (offer.nip.includes('.')) {
        throw new Error('Nip must not be a number');
      }

      if (!offer.bid.includes('.')) {
        throw new Error('Product must be a number');
      }

      if (
        uniqueProductNumberAndNip.some(
          (element) =>
            element.productNumber === offer.productNumber &&
            element.nip === offer.nip
        )
      ) {
        throw new Error('Copmpany must bid only once per product');
      }
      uniqueProductNumberAndNip.push({
        productNumber: offer.productNumber,
        nip: offer.nip,
      });
    }
  }

  if (dataType === 'companies') {
    for (let company of data) {
      if (company.nip?.includes('.')) {
        throw new Error('Nip must not be a number');
      }

      if (company.regonNumber?.includes('.')) {
        throw new Error('Regon must not be a number');
      }

      if (company.krsNumber?.includes('.')) {
        throw new Error('KRS must not be a number');
      }

      if (company.bdoNumber?.includes('.')) {
        throw new Error('BDO must not be a number');
      }

      if (!company.minVolume?.includes('.')) {
        throw new Error('Volume must be a number');
      }

      if (
        (company.isLegalperson === 'tak' &&
          company.isNaturalPerson === 'tak' &&
          company.isPartnership === 'tak') ||
        (company.isLegalperson === '' &&
          company.isNaturalPerson === 'tak' &&
          company.isPartnership === 'tak') ||
        (company.isLegalperson === 'tak' &&
          company.isNaturalPerson === '' &&
          company.isPartnership === 'tak') ||
        (company.isLegalperson === 'tak' &&
          company.isNaturalPerson === 'tak' &&
          company.isPartnership === '') ||
        (company.isLegalperson === null &&
          company.isNaturalPerson === null &&
          company.isPartnership === null)
      ) {
        throw new Error(
          'Company must be only one of the following: Legal Person, Natural Person, Partnership'
        );
      }
    }
  }
};

export default verifyData;
