import axios from "axios";
import express from "express";
import playersRouter from "./routes/players.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { login, register } from "./controlers/User.js";
import { players } from "./controlers/players.js";
const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.get("/player", players);
app.post("/login", login);
app.post("/register", register);

mongoose.connect("mongodb://localhost:27017/fantasyApp").then(() => {
  app.listen(8081, () => {
    console.log("Connected");
  });
});
