import express from "express";
import { getAllTests, getTest, createTest, updateTest, deleteTest, setUserConversationId, getResults } from "../controllers/testController.js";
import { protect } from "../controllers/authController.js";
import { setUserResults } from "../controllers/userController.js";
const testRouter = express.Router({mergeParams:true});

testRouter.route("/")
    .get(getAllTests)
    .post(protect,
        setUserConversationId,
        setUserResults,
        createTest)
testRouter.route("/results")
    .get(getResults)  
testRouter.use(protect)
testRouter.route("/:id")
    .get(getTest)
    .put(updateTest)
    .delete(deleteTest)

export default  testRouter;