import { Router } from "express";
import { createMonsterRoute } from "../controllers/createController.js";

export const createRouter = Router();

createRouter.get('/create', (req, res) => {
  res.render('create');
})
createRouter.post('/create', createMonsterRoute);