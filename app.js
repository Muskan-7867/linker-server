import userRouter from "./src/router/userRouter.js";
import linkTreeRouter from "./src/router/linktree.router.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
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
app.use("/api/v1/link", linkTreeRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

export default app;
