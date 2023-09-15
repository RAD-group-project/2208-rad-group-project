const User = require('../models/user');

const getUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        return res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({
            success: true,
            usersList: users
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const getAllMembers = async (req, res) => {
    try {
        const members = await User.find({ isAdmin: false });
        return res.status(200).json({
            success: true,
            membersList: members
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const addUser = async (req, res) => {
    const newUser = req.body;

    if (!isValidUser(newUser)) {
        return res.status(400).json({ success: false, message: "Invalid user data" });
    }

    try {
        const existingUser = await User.findOne({ email: newUser.email });
        if (existingUser) {
            return res.status(403).json({ success: false, message: "User already exists" });
        }

        const user = new User(newUser);
        user.setPassword(newUser.password);

        const savedUser = await user.save();
        return res.status(201).json({
            success: true,
            user: savedUser
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    console.log(userId)
    const updatedUserData = req.body;

    try {
        const updatedUser = new User(updatedUserData);
        // updatedUser.setPassword(updatedUserData.password);
        console.log("A")
        const user = await User.findByIdAndUpdate(userId, updatedUser);
        return res.status(200).json({
            success: true,
            updatedUser: user
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByIdAndDelete(userId);
        return res.status(200).json({
            success: true,
            deletedUser: user
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};


const isValidUser = (user) => {
    return user && user.email && isValidEmail(user.email);
}

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}



module.exports = {
    getUser,
    getAllUsers,
    getAllMembers,
    addUser,
    updateUser,
    deleteUser
};
