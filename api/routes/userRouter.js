import express from "express";
import { login, signup, protect } from "../controllers/authController.js";
import { getAllUsers, updateUser, getUser, deleteUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter
    .route("/login")
    .post(login)

userRouter
    .route("/signup")
    .post(signup)

userRouter
    .route("/")
    .get(getAllUsers)

userRouter.use(protect)

userRouter
    .route("/:id") 
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

export default userRouter;