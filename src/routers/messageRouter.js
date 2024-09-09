
import { Router } from 'express';
const router = new Router();
import { startClient, sendMessage } from "../services/WhatsappClient.js";
import multer from 'multer';
const upload = multer()

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post("/message", (req, res) => {
  const file = req.file
  const clientId = req.body.clientId;
  sendMessage(req.body.phoneNumber, req.body.message, clientId);
  res.send();
})

router.get('/:id/start', (req, res) => {
  startClient(req.params.id)
  res.send()
})

export default router