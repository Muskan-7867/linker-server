import express from "express";
const router = express.Router();
import {  createLinktree,  deleteLinktree,  editLinktree, getLinktree } from "../controller/linkController.js"


// Link management routes

router.route('/create').post(createLinktree); 
router.route('/edit').put(editLinktree);

router.route('/delete/:id').delete(deleteLinktree);
router.get("/linktree/:treeId", getLinktree);  

export default router;
