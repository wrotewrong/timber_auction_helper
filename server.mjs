import express from 'express';
import auctionRoutes from './routes/auctions.route.mjs';
import catalogRoutes from './routes/catalog.route.mjs';
import contractsRoutes from './routes/contracts.routes.mjs';
import statusRoutes from './routes/status.route.mjs';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '/files/output')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(auctionRoutes.getAll);
app.use(auctionRoutes.getById);
app.use(auctionRoutes.addAuctions);
app.use(auctionRoutes.deleteAuctions);

app.use(catalogRoutes);
app.use(contractsRoutes);
app.use(statusRoutes);

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

app.listen(8001, () => {
  console.log('server is running...');
});
