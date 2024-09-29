import { userOrderModel } from "../database/models/userOrder.model.js";
import { startClient, sendMessage } from "../services/WhatsappClient.js";
import cron from "node-cron";
import catchAsync from "../utils/globalError.js";

const createMessage = catchAsync(async (req, res, next) => {
  const file = req.file;
  const clientId = req.body.clientId;

  sendMessage(req.body.phoneNumber, req.body.message, clientId);

  let { phoneNumber, orderId } = req.body;
  const dateWithTimeZone = (
    timeZone,
    year,
    month,
    day,
    hour,
    minute,
    second
  ) => {
    let date = new Date(Date.UTC(year, month, day, hour, minute, second));
    return new Date(date.toLocaleString("en-US", { timeZone: timeZone }));
  };

  const date = new Date();

  let newUserOrder = new userOrderModel({
    phoneNumber,
    orderId,
    clientId,
    responsed: false,
  });
  await newUserOrder.save();
  res.status(201).json({
    message: "User Order created successfully!",
    newUserOrder,
  });

  let cairoDate = date;
  cairoDate.setMinutes(cairoDate.getMinutes() + 1);
  console.log(cairoDate, "ca");

  const cronExpression = `${cairoDate.getMinutes()} ${cairoDate.getHours()} * * *`;
  const task = cron.schedule(cronExpression, async () => {
    try {
      let check = await userOrderModel.findOne({ _id: newUserOrder._id });
      if (check && check.responsed === false) {
        await userOrderModel.findByIdAndUpdate(newUserOrder._id, {
          responsed: true,
        });
        sendMessage(
          newUserOrder.phoneNumber,
          `Your order is cancelled due to Time OUT`,
          newUserOrder.clientId
        );
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

export { createMessage, createClient };
