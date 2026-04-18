const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Erreurs Prisma
    if (err.code === "P2002") {
        return res.status(409).json({ message: "A record with this value already exists" });
    }
    if (err.code === "P2025") {
        return res.status(404).json({ message: "Record not found" });
    }

    // Erreur personnalisée
    if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandler;
