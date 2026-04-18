import * as movieService from "../services/movieService.js";

const getAllMovies = async (req, res, next) => {
    try {
        const result = await movieService.getAllMovies();
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const getMovieById = async (req, res, next) => {
    try {
        const result = await movieService.getMovieById(req.params.id);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const createMovie = async (req, res, next) => {
    try {
        const { title, description, releaseYear, genre, director, rating } = req.body;
        if (!title || !releaseYear || !genre || !director) {
            return res.status(400).json({ message: "title, releaseYear, genre and director are required!" });
        }
        const result = await movieService.createMovie({ title, description, releaseYear, genre, director, rating });
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

const updateMovie = async (req, res, next) => {
    try {
        const result = await movieService.updateMovie(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const deleteMovie = async (req, res, next) => {
    try {
        await movieService.deleteMovie(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const searchMovies = async (req, res, next) => {
    try {
        const { title, genre } = req.query;
        const result = await movieService.searchMovies({ title, genre });
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    searchMovies,
};
