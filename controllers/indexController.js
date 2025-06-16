import { getMonsters, deleteMonsterById } from "../db/queries.js";
import asyncHandler from "express-async-handler";

// function getMonsterImageURL(monster) {
//   const baseUrl = "https://yourcdn.com/images/";
//   const filename = `${monster.type.toLowerCase()}${monster.q1_answer}${monster.q2_answer}.png`;
//   return `${baseUrl}${filename}`;
// }

export const displayMonsters = asyncHandler(async(req, res) => {
  const monsters = await getMonsters();

  res.render('index', {monsters});
});

export const deleteMonsterRoute = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await deleteMonsterById(id); 
  res.redirect('/');
});
