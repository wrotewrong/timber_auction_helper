import express from 'express';
import auctionRoutes from './routes/auctions.route.mjs';

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(auctionRoutes.getAll);
app.use(auctionRoutes.getById);
app.use(auctionRoutes.addAuctions);
app.use(auctionRoutes.deleteAuctions);

app.get('/', (req, res) => {
  res.send('welcome');
});

app.listen(8000, () => {
  console.log('server is running...');
});
