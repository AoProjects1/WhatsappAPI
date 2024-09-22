import { userOrderModel } from "../database/models/userOrder.model.js";
import { startClient, sendMessage } from "../services/WhatsappClient.js";
import cron from 'node-cron';
import catchAsync from "../utils/globalError.js";

const createMessage = catchAsync(async (req, res, next) => {
  const file = req.file;
  const clientId = req.body.clientId;

  sendMessage(req.body.phoneNumber, req.body.message, clientId);

  let { phoneNumber, orderId } = req.body;
  const dateWithTimeZone = (timeZone, year, month, day, hour, minute, second) => {
    let date = new Date(Date.UTC(year, month, day, hour, minute, second));
    return new Date(date.toLocaleString('en-US', { timeZone: timeZone }));
  };
  
  const date = new Date.now();
  date.setMinutes(date.getMinutes() + 1);
  // date.setHours(date.getHours() + 8);

  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() ; 
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const second = date.getUTCSeconds();
  let cairoDate = dateWithTimeZone('Africa/Cairo', year, month, day, hour, minute, second);

let newUserOrder = new userOrderModel({
   phoneNumber ,
   orderId,
   clientId,
   date: cairoDate,
   responsed: false
 })
 await newUserOrder.save()
  res.status(201).json({
    message: "User Order created successfully!",
    newUserOrder,
  });

  console.log(cairoDate,"cairoDate");
  
  const cronExpression = `${cairoDate.getMinutes()} ${cairoDate.getHours()} * * *`;  
const task = cron.schedule(cronExpression, async () => {
  try {
    let check = await userOrderModel.findOne({ _id: newUserOrder._id });
    if (check && check.responsed === false) {
      await userOrderModel.findByIdAndUpdate(newUserOrder._id, { responsed: true });
      sendMessage(newUserOrder.phoneNumber, `Your order is cancelled due to Time OUT`, newUserOrder.clientId);
      console.log(`Order ${newUserOrder.orderId} cancelled due to timeout`);
    }
    task.stop();
  } catch (error) {
    console.error("Error during cron job execution:", error);
  }
  });
  });



const createClient = catchAsync(async (req, res, next) => {
    startClient(req.params.id);
    res.send();
  });

  export {createMessage , createClient}