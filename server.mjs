import express from 'express';
import catalogRoutes from './routes/catalog.route.mjs';
import contractsRoutes from './routes/contracts.routes.mjs';
import statusRoutes from './routes/status.route.mjs';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/files/output')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
  })
);

app.use('/api/', catalogRoutes);
app.use('/api/', contractsRoutes);
app.use('/api/', statusRoutes);

mongoose.connect(process.env.DBURI);

const db = mongoose.connection;

db.once('open', () => {
  console.log('connected to the database');
});

db.on('error', (err) => {
  console.log('Error:' + err);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(process.env.PORT || 8001, () => {
  console.log('server is running...');
});
