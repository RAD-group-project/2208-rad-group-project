const Borrower = require('../models/borrower');

const getBorrower = async (req, res) => {
    const borrowerId = req.params.id;

    try {
        const borrower = await Borrower.findById(borrowerId);
        return res.status(200).json({
            success: true,
            borrower
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const getAllBorrowers = async (req, res) => {
    try {
        const borrowers = await Borrower.find({});
        return res.status(200).json({
            success: true,
            borrowersList: borrowers
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};


const addBorrower = async (req, res) => {
    const newBorrower = req.body;

    try {
         const existingBorrower = await Borrower.findOne({ email: newBorrower.email });    
         if (existingBorrower) {
           return res
             .status(403)
             .json({ success: false, message: "Borrower already exists" });
         }

        const borrower = new Borrower(newBorrower);

        const savedBorrower = await borrower.save();
        return res.status(201).json({
            success: true,
            user: savedBorrower
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const updateBorrower = async (req, res) => {
    const borrowerId = req.params.id;
    const updatedBorrowerData = req.body;

    try {
        const updatedBorrower = new Borrower(updatedBorrowerData);

        const borrower = await Borrower.findByIdAndUpdate(borrowerId, updatedBorrower);
        return res.status(200).json({
            success: true,
            updatedBorrower: borrower
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const deleteBorrower = async (req, res) => {
    const borrowerId = req.params.id;

    try {
        const borrower = await Borrower.findByIdAndDelete(borrowerId);
        return res.status(200).json({
          success: true,
          deletedBorrower: borrower,
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

module.exports = {
  getBorrower,
  getAllBorrowers,
  addBorrower,
  updateBorrower,
  deleteBorrower,
};
