const Genre = require('../models/genre');

const getGenre = async (req, res) => {
    const genreId = req.params.id;

    try {
        const genre = await Genre.findById(genreId);
        return res.status(200).json({
            success: true,
            genre
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const getAllGenres = async (req, res) => {
    try {
      const genres = await Genre.find();
      res.status(200).json({ success: true, data: genres });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
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

        const savedGenre = await genre.save();    
        return res.status(201).json({
            success: true,
            user: savedGenre
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const updateGenre = async (req, res) => {
    const genreId = req.params.id;
    const updatedGenreData = req.body;

    try {
        const updatedGenre = new Genre(updatedGenreData);

        const genre = await Genre.findByIdAndUpdate(genreId, updatedGenre);
        return res.status(200).json({
            success: true,
            updatedGenre: genre
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

const deleteGenre = async (req, res) => {
    const genreId = req.params.id;

    try {
        const genre = await Genre.findByIdAndDelete(genreId);
        return res.status(200).json({
            success: true,
            deletedUser: genre
        });
    } catch (err) {
        return res.status(400).json({ success: false, err });
    }
};

module.exports = {
    getGenre,
    getAllGenres,
    addGenre,
    updateGenre,
    deleteGenre
};
