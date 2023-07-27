import express from "express";
import { createTeam, player, players } from "../controlers/players.js";
const playersRouter = express?.Router();

playersRouter.get("/players", players);

playersRouter.get("/player", player);

playersRouter.get("/team", createTeam);

export default playersRouter;
