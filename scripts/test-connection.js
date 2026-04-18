import prisma from "./../src/models/prisma.js"

try {
    await prisma.$connect();
    console.log("Database connected successfully!!");

    const result = await prisma.$queryRaw`SELECT NOW()`;
    console.log("Database time:", result[0].now);
} catch {
    console.error("Connection failed:", error.message);
} finally {
    await prisma.$disconnect();
}