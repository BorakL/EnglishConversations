import { authorization, protect } from "../controllers/authController.js";
import { createConversation, getConversation, getAllConversations, updateConversation, deleteConversation, setUser } from "../controllers/conversationController.js";
import express from "express";
import testRouter from "./testRouter.js"; 
const conversationRouter = express.Router({mergeParams:true});

conversationRouter.use("/:conversationId/test", testRouter)

conversationRouter.route("/")
    .get(getAllConversations)
    .post(protect,
        setUser,
        createConversation)

conversationRouter.route("/:id")
    .get(getConversation)
    .put(protect, 
        // authorization(Conversation),
        updateConversation)
    .delete(protect,
        // authorization(Conversation),
        deleteConversation)

export default conversationRouter;