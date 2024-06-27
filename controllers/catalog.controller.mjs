import Products from '../models/productsModel.mjs';
import importExcelDataMDB from '../utils/importExcelDataMDB.mjs';
import createDoc from '../utils/createDocMDB.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getCatalog = async (req, res) => {
  try {
    const products = await Products.find();
    if (products.length > 0) {
      res.status(200).json({ message: 'OK', products });
    } else {
      res.status(400).json({ message: 'Catalog not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

export const importData = async (req, res) => {
  try {
    let products = await Products.find();
    if (products.length === 0) {
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
        console.log(
          `Product number ${newProduct.productNumber} has been added`
        );
      }
      products = await Products.find();
    }

    res.status(200).json({ message: 'OK', products });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

export const downloadCatalog = async (req, res) => {
  try {
    const products = await Products.find();
    const filename = createDoc('catalog', 'inputKatalog', products);
    const filePath = path.join(__dirname, `../files/output/${filename}.docx`);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${encodeURIComponent(filename)}"`
    );
    res.status(200).sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error sending file');
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

export default {
  getCatalog,
  importData,
  downloadCatalog,
};
