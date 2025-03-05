import dotenv from "dotenv";

dotenv.config();

export const config = {
    dburl: process.env.MONGO_CONNECTION_STRING || "mongodb+srv://muskanuser:L7mKXFLoJ3p9mq1I@linktree.jctbp.mongodb.net/?retryWrites=true&w=majority&appName=linktree"
};
