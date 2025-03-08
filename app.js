import userRouter from "./src/router/userRouter.js"
import linkTreeRouter from "./src/router/linktree.router.js"
import cors from 'cors'
import dotenv from "dotenv";
import express from 'express';
dotenv.config();

const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

  const isProduction = process.env.PROD; 
  const FRONTEND_URL = isProduction
    ? process.env.VITE_FRONTEND_URL
    : "http://localhost:5173";
const allowedOrigins = [FRONTEND_URL];

  
const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Welcome Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Lnk Tree" });
});

// Routes
app.use("/api/v1/user", userRouter);
// Links Routes
app.use("/api/v1/link", linkTreeRouter);

export default app; 