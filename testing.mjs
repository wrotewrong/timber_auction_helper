import importProducts from './utils/importProducts.mjs';
import createDoc from './utils/createDoc.mjs';

const products = [
  { first_name: 1, last_name: 'Brzeziny', masa: 4.76, cena: 5000.62 },
  { first_name: 2, last_name: 'Bełchatów', masa: 1.76, cena: 2783.62 },
  { first_name: 3, last_name: 'Kutno', masa: 2.0, cena: 3333.62 },
];

for (let product of products) {
  createDoc('contract', product);
}
