export const importOffers = (req, res) => {
  try {
    res.status(200).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
};

export const importCompanies = (req, res) => {
  try {
    res.status(200).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
};

export const estimateWinner = (req, res) => {
  try {
    res.status(200).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
};

export default { importOffers, importCompanies, estimateWinner };
