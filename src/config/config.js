import dotenv from "dotenv";

dotenv.config();

export const config = {
    dburl: process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/"
};
