import express from 'express';
import auctionRoutes from './routes/auctions.route.mjs';
import catalogRoutes from './routes/catalog.route.mjs';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(auctionRoutes.getAll);
app.use(auctionRoutes.getById);
app.use(auctionRoutes.addAuctions);
app.use(auctionRoutes.deleteAuctions);

app.use(catalogRoutes);

app.use(cors());

// mongoose.connect('mongodb://localhost:27017/auctionHelper');
mongoose.connect('mongodb://127.0.0.1:27017/auctionHelper');

const db = mongoose.connection;

db.once('open', () => {
  console.log('connected to the database');
});

db.on('error', (err) => {
  console.log('Error:' + err);
});

app.get('/', (req, res) => {
  res.send('welcome');
});

app.listen(8000, () => {
  console.log('server is running...');
});
