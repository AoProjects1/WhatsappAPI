import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode  from "qrcode-terminal";
const { MessageMedia } = pkg;
const clients = {};

export function startClient(id) {
  clients[id] = new Client({
    authStrategy: new LocalAuth({
      clientId: id,
    }),
    webVersionCache: {
      type: "remote",
      remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2407.3.html`,
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
      if (
        msg.from != "status@broadcast"
      ) {
        const contact = await msg.getContact();
        console.log(contact, msg.from);
        console.log(msg,"ddd");
      }
    } catch (error) {
      console.error(error);
    }
  });
}

export function sendMessage(phoneNumber, message, clientId) {
  // if(file) {
  //     const messageFile = new MessageMedia(file.mimetype, file.buffer.toString('base64'))
  //     clients[Number(clientId)].sendMessage(phoneNumber, messageFile)
  // } else {
  clients[clientId].sendMessage(phoneNumber, message);
  // }
}

