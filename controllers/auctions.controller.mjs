const auctionsController = {
  getAll: (req, res) => {
    try {
      res.status(200).json({ message: 'OK' });
      console.log('getAll works');
    } catch (err) {
      res.status(500).json({ message: err });
      console.log('error');
    }
  },
  getById: () => {
    console.log('getById works');
  },
  addAuctions: () => {
    console.log('addAuctions works');
  },
  deleteAuctions: () => {
    console.log('deleteAuctions works');
  },
};

export default auctionsController;
