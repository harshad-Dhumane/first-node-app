import express from "express";
import { getTopOfWeek,addBook } from "../controllers/bookController.js"

const route = express.Router();

route.get("/getTopOfWeek",getTopOfWeek);
route.post("/addBook",addBook);

export default route;