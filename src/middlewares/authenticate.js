import { verifyToken } from "../utils/token.js";

const authenticate = async (req, res, next) => {
    try {
        // On récupère le header Authorization
        const autheHeader = req.headers.authorization;

        // Si le header est absent ou mal formaté, on refuse l'accès
        if (!autheHeader || !autheHeader.startsWith("Bearer ")) {
            res.status(401).json({
                message: 'Authentication failed!!'
            });
        }

        // On extrait le token du header
        const token = autheHeader.split(" ")[1];

        // On vérifie et décode le token JWT
        const decodedToken = verifyToken(token);

        // On stocke l'ID de l'utilisateur dans la requête pour les prochains middlewares
        req.userId = decodedToken.userId;

        next();
    } catch (error) {
        res.status(500).json({
            message: 'Authentication failed!!'
        });
    }
};

export default authenticate;
