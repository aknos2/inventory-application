import pool from "./pool.js";

export async function getMonsters() {
  const { rows } = await pool.query(`
    SELECT 
      id,
      name AS username,
      type,
      q1_answer,
      q2_answer,
      LOWER(type) || q1_answer || q2_answer || '.png' AS image_filename
    FROM monsters;
  `);
  return rows;
}

export async function createMonster({ username, type, q1_answer, q2_answer }) {
  await pool.query(`
    INSERT INTO monsters (name, type, q1_answer, q2_answer)
    VALUES ($1, $2, $3, $4)
  `, [username, type, q1_answer, q2_answer]);
}

export async function deleteMonsterById(id) {
  await pool.query('DELETE FROM monsters WHERE id = $1', [id]);
}
