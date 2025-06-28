import client from '../client.js';

// CREATE a new user
export async function createUser(first_name, last_name, username, password) {
  const { rows } = await client.query(
    `INSERT INTO users (first_name, last_name, username, password)
     VALUES ($1, $2, $3, $4)
     RETURNING *;`,
    [first_name, last_name, username, password]
  );
  return rows[0];
}

// READ - Get all users
export async function getAllUsers() {
  const { rows } = await client.query(`SELECT * FROM users;`);
  return rows;
}

// READ - Get one user by ID
export async function getUserById(id) {
  console.log(id)
  const { rows } = await client.query(
    `SELECT * FROM users WHERE id = $1;`,
    [id]
  );
  return rows[0];
}

// UPDATE user by ID
export async function updateUser(id, first_name, last_name, username, password) {
  const { rows } = await client.query(
    `UPDATE users
     SET first_name = $1,
         last_name = $2, 
         username = $3,
         password = $4
     WHERE id = $5
     RETURNING *;`,
    [first_name, last_name, username, password, id]
  );
  return rows[0];
}

// DELETE user by ID
export async function deleteUser(id) {
  const { rows } = await client.query(
    `DELETE FROM users
     WHERE id = $1
     RETURNING *;`,
    [id]
  );
  return rows[0];
}
