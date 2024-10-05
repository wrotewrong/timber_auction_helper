import Products from '../models/productsModel.mjs';
import importExcelDataMDB from '../utils/importExcelDataMDB.mjs';
import createDoc from '../utils/createDocMDB.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mongoose from 'mongoose';

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
  const session = await mongoose.startSession();
  let transactionFinished = false;
  try {
    session.startTransaction();
    let products = await Products.find().session(session);
    if (products.length === 0) {
      const importedProducts = await importExcelDataMDB(
        'products',
        'productsDataMDB'
      );

      if (!importedProducts || importedProducts.length === 0) {
        res.status(400).json({ message: 'No products to import' });
        console.log('No products to import');
        return;
      }

      const bulkProducts = importedProducts.map((product) => {
        return {
          insertOne: {
            document: {
              productNumber: product.productNumber,
              forestDistrict: product.forestDistrict,
              woodNumber: product.woodNumber,
              species: product.species,
              length: product.length,
              diameter: product.diameter,
              volume: product.volume,
              class: product.class,
              startingPriceSingle: product.startingPriceSingle,
              maxOfferCompany: product.maxOfferCompany,
              maxOfferBid: product.maxOfferBid,
              finalPriceTotal: product.finalPriceTotal,
            },
          },
        };
      });

      await Products.bulkWrite(bulkProducts, { session });
      await session.commitTransaction();
      session.endSession();
      transactionFinished = true;

      products = await Products.find();
      res.status(200).json({ message: 'OK', products });
      console.log(`Added ${products.length} products`);
    } else {
      res.status(200).json({ message: 'OK', products });
      console.log(`Products has already been added`);
    }
  } catch (err) {
    if (!transactionFinished) {
      await session.abortTransaction();
      session.endSession();
      console.log(`Transaction failed`);
    }

    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

// // non-bulk non-transaction
// export const importData = async (req, res) => {
//   try {
//     let products = await Products.find();
//     if (products.length === 0) {
//       const importedProducts = await importExcelDataMDB(
//         'products',
//         'productsDataMDB'
//       )
//         .then((products) => {
//           return products;
//         })
//         .catch((error) => {
//           console.error('Error importing products:', error);
//         });

//       for (let importedProduct of importedProducts) {
//         const newProduct = new Products(importedProduct);
//         await newProduct.save();
//         console.log(
//           `Product number ${newProduct.productNumber} has been added`
//         );
//       }
//       products = await Products.find();
//     }

//     res.status(200).json({ message: 'OK', products });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//     console.log(err.message);
//   }
// };

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

export const removeAllCatalogData = async (req, res) => {
  try {
    let products = await Products.find();
    const inputFiles = fs.readdirSync(path.join(__dirname, '../files/input/'));
    const catalogInputFiles = inputFiles.filter((file) =>
      file.includes('products') ? file : ''
    );
    const outputFiles = fs.readdirSync(
      path.join(__dirname, '../files/output/')
    );
    const catalogOutputFiles = outputFiles.filter((file) =>
      file.includes('Katalog') ? file : ''
    );

    if (
      products.length > 0 ||
      catalogInputFiles.length > 0 ||
      catalogOutputFiles.length > 0
    ) {
      await Products.deleteMany();

      products = await Products.find();

      if (catalogInputFiles.length > 0) {
        catalogInputFiles.forEach((file) => {
          fs.unlinkSync(path.join(__dirname, '../files/input/', file));
        });
      }

      if (catalogOutputFiles.length > 0) {
        catalogOutputFiles.forEach((file) => {
          fs.unlinkSync(path.join(__dirname, '../files/output/', file));
        });
      }

      res.status(200).json({ message: 'OK', products });
      console.log('Catalog data has been removed');
    } else {
      res.status(400).json({ message: 'Not found...' });
      console.log('Catalog data does not exist');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

export default {
  getCatalog,
  importData,
  downloadCatalog,
  removeAllCatalogData,
};
