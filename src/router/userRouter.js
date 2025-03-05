import express from "express";
const router = express.Router();
import { createUser, loginUser, demo } from "../controller/userController.js"


// Demo route
router.route('/demo').get(demo);

// User registration and login routes
router.route('/register').post(createUser);
router.route('/login').post(loginUser);

export default router;
