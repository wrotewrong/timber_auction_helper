export const importData = (req, res) => {
  try {
    res.status(200).send('works');
  } catch (err) {
    res.status(500).send(err);
  }
};

export const downloadCatalog = (req, res) => {
  try {
    res.status(200).send('works');
  } catch (err) {
    res.status(500).send(err);
  }
};

export default { importData, downloadCatalog };
