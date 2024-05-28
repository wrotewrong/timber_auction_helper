import importExcelDataMDB from '../utils/importExcelDataMDB.mjs';
import Products from '../models/productsModel.mjs';

export const importData = async (req, res) => {
  try {
    const importedProducts = await importExcelDataMDB(
      'products',
      'productsDataMDB'
    )
      .then((products) => {
        return products;
      })
      .catch((error) => {
        console.error('Error importing products:', error);
      });

    for (let importedProduct of importedProducts) {
      const newProduct = new Products(importedProduct);
      await newProduct.save();
      console.log(`Product number ${newProduct.productNumber} has been added`);
    }

    res.status(200).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

export const downloadCatalog = (req, res) => {
  try {
    res.status(200).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { importData, downloadCatalog };
