import * as userService from '../services/userService.js';

const getAllUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const results = await userService.getAllUsers({ page, limit });
        res.json(results);
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const userData = req.body;
        if (!userData.email || !userData.name || !userData.password) {
            return res.status(400).json({
                message: "Email, name and password are required!!"
            });
        }
        const user = await userService.createUser(userData);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const user = await userService.updateUser(userId, userData);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const deleteRes = await userService.deleteUser(userId);
        if (!deleteRes) {
            return res.json({ message: 'User Not found!' });
        }
        res.json({ message: 'User deleted successfully!' });
    } catch (error) {
        next(error);
    }
};

export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
