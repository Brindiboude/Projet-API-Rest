import * as authService from "../services/authService.js";

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required!"
            });
        }
        const result = await authService.register({ name, email, password });
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required!!"
            });
        }
        const result = await authService.login({ email, password });
        res.json(result);
    } catch (error) {
        next(error)
    }
};

const me = async (req, res, next) => {
    try {
        const result = await authService.me(req.userId);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export {
    login,
    register,
    me,
}
