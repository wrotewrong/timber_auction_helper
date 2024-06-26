import Status from '../models/statusModel.mjs';

export const getStatus = async (req, res) => {
  try {
    let status = await Status.findOne();
    if (!status) {
      const newStatus = new Status({});
      await newStatus.save();
      status = await Status.findOne();
    }
    res.status(200).json({ message: 'OK', status: status });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

export default { getStatus };
