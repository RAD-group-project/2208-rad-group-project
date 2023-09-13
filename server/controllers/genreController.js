const Genre = require('../models/genre');

const getGenre = async (req, res) => {
    const bookId = req.params.id;

    try {
        const genre = await Genre.findById(bookId);
        return res.status(200).json({
            success: true,
            book
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find({});
        return res.status(200).json({
            success: true,
            booksList: genres
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};


const addGenre = async (req, res) => {
    const newGenre = req.body;

    try {
         const existingGenre = await Genre.findOne({category: newGenre.category });    
         if (existingGenre) {
            return res.status(403).json({ success: false, message: "Genre already exists" }); 
        } 

        const genre = new Genre(newGenre);

        const savedGenre = await genre.save();     //Book or book?
        return res.status(201).json({
            success: true,
            user: savedGenre
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const updateGenre = async (req, res) => {
    const bookId = req.params.id;
    const updatedBookData = req.body;

    try {
        const updatedGenre = new Genre(updatedGenreData);

        const genre = await Genre.findByIdAndUpdate(bookId, updatedGenre);
        return res.status(200).json({
            success: true,
            updatedGenre: genre
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const deleteGenre = async (req, res) => {
    const bookId = req.params.id;

    try {
        const genre = await Genre.findByIdAndDelete(bookId);
        return res.status(200).json({
            success: true,
            deletedUser: genre
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

module.exports = {
    getgenre,
    getAllgenres,
    addgenre,
    updategenre,
    deletegenre
};
