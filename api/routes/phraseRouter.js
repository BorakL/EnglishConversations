import express from "express";
import { getPhrase, createPhrase, updatePhrase, deletePhrase } from "../controllers/phraseController.js";
import { protect } from "../controllers/authController";

const phraseRouter = express.Router({mergeParams:true});

phraseRouter.use(protect)

phraseRouter.route("/")
    .post(createPhrase)

phraseRouter.route("/:id")
    .get(getPhrase)
    .put(updatePhrase)
    .delete(deletePhrase)


export default phraseRouter