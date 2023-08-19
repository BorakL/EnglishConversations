import express from "express";
import { getAllTopic, createTopic, getTopic, updateTopic, deleteTopic } from "../controllers/topicController.js";
import conversationRouter from "./conversationRouter.js";
import { protect, restrictTo } from "../controllers/authController.js";
const topicRouter = express.Router({mergeParams:true});

topicRouter.use("/:topicId/conversations",conversationRouter)

topicRouter.route("/")
    .get(getAllTopic)
    .post(protect,
        restrictTo("admin"),
        createTopic)

topicRouter.route("/:id")
    .get(getTopic)
    .put(protect,
        restrictTo("admin"),
        updateTopic)
    .delete(protect,
        restrictTo("admin"),
        deleteTopic)

export default topicRouter;