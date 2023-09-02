const Authour = require('../models/authour');

const getAuthour = async (req, res) => {
    const authourId = req.params.id;

    try {
        const authour = await Authour.findById(authourId);
        return res.status(200).json({
            success: true,
            authour
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const getAllAuthours = async (req, res) => {
    try {
        const authours = await Authour.find({});
        return res.status(200).json({
            success: true,
            authoursList: authours
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};


const addAuthour = async (req, res) => {
    const newAuthour = req.body;

    try {
         const existingAuthour = await Authour.findOne({ name: newAuthour.name });    
         if (existingBook) {
            return res.status(403).json({ success: false, message: "Authour already exists" }); 
        }

        const authour = new Authour(newAuthour);

        const savedAuthour = await authour.save();     //Book or book?
        return res.status(201).json({
            success: true,
            user: savedAuthour
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const updateAuthour = async (req, res) => {
    const authourId = req.params.id;
    const updatedAuthourData = req.body;

    try {
        const updatedAuthour = new Authour(updatedAuthourData);

        const authour = await Authour.findByIdAndUpdate(authourId, updatedAuthour);
        return res.status(200).json({
            success: true,
            updatedBook: authour
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const deleteAuthour = async (req, res) => {
    const authourId = req.params.id;

    try {
        const authour = await Authour.findByIdAndDelete(authourId);
        return res.status(200).json({
            success: true,
            deletedUser: authour
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

module.exports = {
    getAuthour,
    getAllAuthours,
    addAuthour,
    updateAuthour,
    deleteAuthour
};
