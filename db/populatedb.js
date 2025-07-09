#!/usr/bin/env node

import { Client } from "pg";
import dotenv from 'dotenv';

dotenv.config();

const SQL = `
  CREATE TABLE IF NOT EXISTS monsters (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK(type IN ('humanoid', 'oneeye', 'weird')) NOT NULL,
  q1_answer CHAR(1) CHECK(q1_answer IN ('A', 'B', 'C')) NOT NULL,
  q2_answer CHAR(1) CHECK(q2_answer IN ('A', 'B', 'C')) NOT NULL
);

  INSERT INTO monsters (name, type, q1_answer, q2_answer)
  SELECT 'Elizabeth', 'weird', 'C', 'A'
  WHERE NOT EXISTS (SELECT 1 FROM monsters WHERE name = 'Elizabeth');
  
  INSERT INTO monsters (name, type, q1_answer, q2_answer)
  SELECT 'Bobo', 'humanoid', 'A', 'B'
  WHERE NOT EXISTS (SELECT 1 FROM monsters WHERE name = 'Bobo');
`;

async function main() {
  try {
    console.log("seeding...");
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  } catch (err) {
    console.log('Something went wrong', err);
    process.exit(1);
  }
}

main();