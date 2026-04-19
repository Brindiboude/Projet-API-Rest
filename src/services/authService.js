import prisma from "../models/prisma.js"
import { comparePasswords, hashPassword } from "../utils/passwords.js";
import { generateToken } from "../utils/token.js";

// On fait l'inscription d'un nouvel utilisateur
const register = async ({ name, email, password }) => {
    // On vérifie si l'email est deja utilisé
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        const error = new Error("Email already in use");
        error.statusCode = 409;
        throw error;
    }
    // On hashe le mot de passe avant de le stocker
    const hashedPassword = await hashPassword(password);
    // On crée l'utilisateur en base de données
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });
    // Cela génère un token JWT
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
// Connexion d'un utilisateur existant
const login = async ({ email, password }) => {
     // On vérifie si l'utilisateur existe
    const user = await prisma.user.findUnique({
        where: { email }
    });
    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }
    // On vérifie si le mot de passe est correct
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }
    // Généres un token JWT
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
// Récupéres l'utilisateur connecté, sans le mot de passe
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
