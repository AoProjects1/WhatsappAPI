// import express from "express";
// const router = express.Router();
// import { startClient, sendMessage } from "../services/WhatsappClient.js";
// import multer from "multer";
// import { userOrderModel } from "../database/models/userOrder.model.js";
// const upload = multer();

// router.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// router.post("/message", async(req, res) => {
//   const file = req.file;
//   const clientId = req.body.clientId;
//   sendMessage(req.body.phoneNumber, req.body.message, clientId);
//   let { phoneNumber, orderId } = req.body;
//   const newUserOrder = await userOrderModel.insertMany({
//     phoneNumber,
//     orderId,
//     clientId,
//   })
//   let timer = setTimeout(() => {
//     let check = userOrderModel.findOne({$and:[
//       {_id: newUserOrder._id},
//       {responsed: false}
//     ]})
//     if(check) {
//       let updatedCheck = userOrderModel.findByIdAndUpdate(check._id,{responsed:true},{new:true})
//       sendMessage(req.body.phoneNumber, "Your order is cancelled Time OUT", clientId);
//     }
//   },30000)
//   res.status(201).json({
//     message: "User Order created successfully!",
//     newUserOrder,
//   });
// });

//   router.get("/:id/start", (req, res) => {
//   startClient(req.params.id);
//   res.send();
// });

// export default router;
