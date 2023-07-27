import axios from "axios";
import express from "express";
import playersRouter from "./routes/players.js";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();
app.use(cors());
app.use("/player", playersRouter);

app.listen(8081, () => {
  console.log("Connected");
});
