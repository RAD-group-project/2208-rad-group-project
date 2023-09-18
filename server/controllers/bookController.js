const Book = require('../models/book');

const getBook = async (req, res) => {
    const bookId = req.params.id;

    try {
        const book = await Book.findById(bookId);
        return res.status(200).json({
            success: true,
            book
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            success: true,
            booksList: books
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};


const addBook = async (req, res) => {
    const newBook = req.body;

    try {
         const existingBook = await Book.findOne({ ISBN: newBook.ISBN });    
         if (existingBook) {
            return res.status(403).json({ success: false, message: "Book already exists" }); 
        }

        const book = new Book(newBook);

        const savedBook = await book.save();     
        return res.status(201).json({
            success: true,
            user: savedBook
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const updateBook = async (req, res) => {
    const bookId = req.params.id;
    const updatedBookData = req.body;

    try {
        const updatedBook = new Book(updatedBookData);

        const book = await Book.findByIdAndUpdate(bookId, updatedBook);
        return res.status(200).json({
            success: true,
            updatedBook: book
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const deleteBook = async (req, res) => {
    const bookId = req.params.id;

    try {
        const book = await Book.findByIdAndDelete(bookId);
        return res.status(200).json({
            success: true,
            deletedUser: book
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

module.exports = {
    getBook,
    getAllBooks,
    addBook,
    updateBook,
    deleteBook
};
