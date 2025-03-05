import userRouter from "./src/router/userRouter.js"
import linkTreeRouter from "./src/router/linktree.router.js"
import cors from 'cors'
import express from 'express';


const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: "[http://localhost:5173]",
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