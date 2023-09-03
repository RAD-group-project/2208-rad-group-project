const Author = require('../models/author');

const getAuthor = async (req, res) => {
    const authorId = req.params.id;

    try {
        const author = await Author.findById(authorId);
        return res.status(200).json({
            success: true,
            author
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find({});
        return res.status(200).json({
            success: true,
            authorsList: authors
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};


const addAuthor = async (req, res) => {
    const newAuthor = req.body;

    try {
        const existingAuthor = await Author.findOne({
            firstName: newAuthor.firstName,
            lastName: newAuthor.lastName,
          });
             
         if (existingAuthor) {
            return res.status(403).json({ success: false, message: "Author already exists" }); 
        }

        const author = new Author(newAuthor);

        const savedAuthor = await author.save();     //Book or book?
        return res.status(201).json({
            success: true,
            user: savedAuthor
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const updateAuthor = async (req, res) => {
    const authorId = req.params.id;
    const updatedAuthorData = req.body;

    try {
        const updatedAuthor = new Author(updatedAuthorData);

        const author = await Author.findByIdAndUpdate(authorId, updatedAuthor);
        return res.status(200).json({
            success: true,
            updatedAuthor: author
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const deleteAuthor = async (req, res) => {
    const authorId = req.params.id;

    try {
        const author = await Author.findByIdAndDelete(authorId);
        return res.status(200).json({
            success: true,
            deletedUser: author
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

module.exports = {
    getAuthor,
    getAllAuthors,
    addAuthor,
    updateAuthor,
    deleteAuthor
};
