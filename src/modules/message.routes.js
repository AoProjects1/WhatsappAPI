import express from "express";
import * as messageController from "./message.controller.js";

const messageRouter = express.Router();

messageRouter.post("/message", messageController.createMessage);
messageRouter.get("/:id/start", messageController.createClient);

export default messageRouter;
