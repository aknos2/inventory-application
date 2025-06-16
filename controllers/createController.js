import asyncHandler from "express-async-handler";
import { createMonster } from "../db/queries.js"; 
import { body, validationResult } from 'express-validator';

const validateName = [
  body('username')
    .trim()
    .isLength({ min: 1, max: 20}).withMessage('Name must be 1-20 characters long')
    .matches(/^[a-zA-Z0-9\s]+$/).withMessage('Name must contain only letters, numbers, and spaces')
];

export const createMonsterRoute = [
  validateName,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { username, type, q1_answer, q2_answer } = req.body;
    await createMonster({ username, type, q1_answer, q2_answer });
    res.status(201).json({ message: "Monster created" });
  })
];
