import express from "express";
import cors from "cors";
import { startClient } from "./src/services/WhatsappClient.js";
import { globalError } from "./src/utils/globalError.js";
import dbConnection from "./src/database/connection.js";
import messageRouter from "./src/modules/message.routes.js";

const app = express();
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  credentials: true, // Allow credentials to be sent with requests
};
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnection();
app.use(messageRouter);
app.use("/", (req, res, next) => {
  res.send("Page Not Found");
// next(res.status(404).json({ message: "Page Not Found" }));
});
app.all("*", (req, res, next) => {
  next(res.status(404).json({ message: "Not found" }));
});
app.use(globalError);
startClient(4);
app.listen(3000, () => console.log(`Server is ready in on port 3000`));
