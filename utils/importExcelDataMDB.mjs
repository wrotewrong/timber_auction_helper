import ExcelJS from 'exceljs';
import BigNumber from 'bignumber.js';

const importExcelDataMDB = (dataType, inputFileName) => {
  const workbook = new ExcelJS.Workbook();
  return workbook.xlsx
    .readFile(`./files/input/${inputFileName}.xlsx`)
    .then(function () {
      const worksheet = workbook.getWorksheet(1);

      const allData = [];
      worksheet.eachRow(function (row, rowNumber) {
        const rowData = [];
        row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
          rowData.push(cell.value);
        });
        allData.push(rowData);
      });

      const attributes = allData[0];
      const dataObject = {};
      for (let attribute of attributes) {
        dataObject[attribute] = undefined;
      }

      const data = {};
      if (dataType === 'products') {
        data.allProducts = [];
      } else if (dataType === 'companies') {
        data.allCompanies = [];
      } else if (dataType === 'offers') {
        data.allOffers = [];
      } else {
        return;
      }

      for (let element of allData.slice(1)) {
        const filledData = {};
        let i = 0;
        for (let attribute in dataObject) {
          if (typeof element[i] === 'number') {
            let x = new BigNumber(element[i]);
            filledData[attribute] = x.toFixed(2);
          } else {
            filledData[attribute] = element[i];
          }
          i++;
        }
        if (dataType === 'products') {
          // filledData.maxBid = { company: undefined, offer: 0 };
          data.allProducts.push(filledData);
        } else if (dataType === 'companies') {
          // filledData.volumeWon = 0;
          // filledData.productsWon = [];
          data.allCompanies.push(filledData);
        } else if (dataType === 'offers') {
          data.allOffers.push(filledData);
        }
      }
      // console.log(allProducts);

      if (dataType === 'products') {
        return data.allProducts;
      } else if (dataType === 'companies') {
        return data.allCompanies;
      } else if (dataType === 'offers') {
        return data.allOffers;
      }
    })
    .catch(function (error) {
      console.error('Error reading the Excel file:', error);
    });
};

export default importExcelDataMDB;
