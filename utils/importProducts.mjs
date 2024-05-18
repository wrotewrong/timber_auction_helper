import ExcelJS from 'exceljs';

const importProducts = () => {
  const workbook = new ExcelJS.Workbook();
  return workbook.xlsx
    .readFile('./files/input/form.xlsx')
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
      //   console.log(allData);

      const attributes = allData[0];
      const emptyProduct = {};
      for (let attribute of attributes) {
        emptyProduct[attribute] = undefined;
      }
      //   console.log(emptyProduct);

      const allProducts = [];
      for (let element of allData.slice(1)) {
        const filledProduct = {};
        let i = 0;
        for (let attribute in emptyProduct) {
          filledProduct[attribute] = element[i];
          i++;
        }
        filledProduct.maxBid = { company: undefined, offer: 0 };
        allProducts.push(filledProduct);
      }
      // console.log(allProducts);

      return allProducts;
    })
    .catch(function (error) {
      console.error('Error reading the Excel file:', error);
    });
};

export default importProducts;
