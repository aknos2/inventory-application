#!/usr/bin/env node

import pool from './pool.js';

const SQL = `
  CREATE TABLE IF NOT EXISTS monsters (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK(type IN ('humanoid', 'oneeye', 'weird')) NOT NULL,
  q1_answer CHAR(1) CHECK(q1_answer IN ('A', 'B', 'C')) NOT NULL,
  q2_answer CHAR(1) CHECK(q2_answer IN ('A', 'B', 'C')) NOT NULL
);

  INSERT INTO monsters (name, type, q1_answer, q2_answer)
  VALUES 
    ('Elizabeth', 'weird', 'C', 'A'),
    ('Bobo', 'humanoid', 'A', 'B')
    ON CONFLICT (name) DO NOTHING;
`;

async function main() {
  try {
    console.log("seeding...");
    await pool.query(SQL);
    console.log("done");
  } catch (err) {
    console.log('Something went wrong', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();