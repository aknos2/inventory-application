import { Router } from "express";
import { deleteMonsterRoute, displayMonsters } from "../controllers/indexController.js";

export const indexRouter = Router();

indexRouter.get('/', displayMonsters);
indexRouter.post('/delete/:id', deleteMonsterRoute);
