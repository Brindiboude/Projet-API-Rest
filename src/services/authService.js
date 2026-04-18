import prisma from "../models/prisma.js"
import { comparePasswords, hashPassword } from "../utils/passwords.js";
import { generateToken } from "../utils/token.js";

const register = async ({ name, email, password }) => {
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        const error = new Error("Email already in use");
        error.statusCode = 409;
        throw error;
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });
    const token = generateToken(user.id);
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
    }
};

const login = async ({ email, password }) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });
    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }
    const token = generateToken(user.id);
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
    }
};

const me = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        }
    });
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return { user };
};

export {
    login,
    register,
    me,
}
