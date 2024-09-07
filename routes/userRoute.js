import express from "express";
import {createUser, getAllUser, deleteUser,updateUser,login,register} from "../controllers/userController.js"

const route= express.Router();

route.post("/createUser",createUser);
route.get("/getAllUser",getAllUser);
route.put("/updateUser",updateUser);
route.delete("/deleteUser",deleteUser);
route.post("/login",login);
route.post("/register",register);


export default route;