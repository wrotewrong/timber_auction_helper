import archiver from 'archiver';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const zipFiles = () => {
  const files = fs.readdirSync(path.join(__dirname, '../files/output/'));
  const output = fs.createWriteStream(
    path.join(__dirname, '../files/output/umowy.zip')
  );
  const archive = archiver('zip', {
    zlib: { level: 9 },
  });

  output.on('close', () => {
    console.log(
      `ZIP file created successfully with ${archive.pointer()} total bytes`
    );
  });

  archive.on('warning', (err) => {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);

  files.forEach((file) => {
    if (file.includes('nip')) {
      const filePath = path.join(__dirname, `../files/output/${file}`);
      archive.file(filePath, { name: path.basename(file) });
    }
  });

  archive.finalize();
};

export default zipFiles;
