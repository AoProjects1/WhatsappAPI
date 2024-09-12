import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;
import qrcode from "qrcode-terminal";
import { userOrderModel } from "../database/models/userOrder.model.js";
const { MessageMedia } = pkg;
const clients = {};

export function startClient(id) {
  clients[id] = new Client({
    authStrategy: new LocalAuth({
      clientId: id,
    }),
    webVersionCache: {
      type: "remote",
      remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2346.52.html`,
    },
  });

  clients[id].initialize().catch((err) => console.log(err));

  clients[id].on("qr", (qr) => {
    console.log(qr);
    qrcode.generate(qr, { small: true });
  });
  clients[id].on("ready", () => console.log("Client is ready!"));

  clients[id].on("message", async (msg) => {
    try {
      if (msg.from != "status@broadcast") {
        const contact = await msg.getContact();
        // console.log(contact, msg.from);
        if(msg.body){
        if(msg.body.trim() === "1") {
          let check = await userOrderModel.findOne({$and:[
            {phoneNumber: msg.from},
            {responsed: false}
          ]
          })
          if(check) {
            let updatedCheck = await userOrderModel.findByIdAndUpdate(check._id,{responsed:true},{new:true})
            let message = `Your order id is ${updatedCheck.orderId} 11111111111`
            sendMessage(check.phoneNumber,message, check.clientId);
          }
        }else if(msg.body.trim() === "2") {
          let check = await userOrderModel.findOne({$and:[
            {phoneNumber: msg.from},
            {responsed: false}
          ]
          })
          if(check) {
            let updatedCheck = await userOrderModel.findByIdAndUpdate(check._id,{responsed:true},{new:true})
            let message = `Your order is cancelled 22222222`
            sendMessage(check.phoneNumber,message, check.clientId);
          }        }else if(msg.body.trim() === "3") {
            let check = await userOrderModel.findOne({$and:[
              {phoneNumber: msg.from},
              {responsed: false}
            ]
            })
            if(check) {
              let updatedCheck = await userOrderModel.findByIdAndUpdate(check._id,{responsed:true},{new:true})
              let message = `5555oder is accepted 33333333`
              sendMessage(check.phoneNumber,message, check.clientId);
            }      }
    }
      }
    } catch (error) {
      console.error(error);
    }
  });
}

export async function sendMessage(phoneNumber, message, clientId) {
  // if(file) {
  //     const messageFile = new MessageMedia(file.mimetype, file.buffer.toString('base64'))
  //     clients[Number(clientId)].sendMessage(phoneNumber, messageFile)
  // } else {
  clients[clientId].sendMessage(phoneNumber, message);
  // }
}
