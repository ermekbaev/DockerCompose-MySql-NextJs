  import { createPool } from "mysql2/promise";

  const pool = createPool({
    host: 'mysql',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'users',
    connectionLimit: 25,
  });

  export default async function handler(req:any, res:any) {
    if (req.method === 'GET') {
      try {
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.query("SELECT * FROM users");
        connection.release(); 
        res.status(200).json(rows);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Error fetching data" });
      }
    } else if (req.method === 'POST') {
      try {
        const { name, email, number, departmentId, roleId, address } = req.body;
        const connection = await pool.getConnection();
        const result = await connection.query(
          "INSERT INTO users (name, email, number, department_id, role_id, address) VALUES (?, ?, ?, ?, ?, ?)",
          [name, email, number, departmentId, roleId, address]
        );
        connection.release(); 
        res.status(200).json({ message: "User added successfully", result });
      } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Error adding user" });
      }
    } else {
      res.status(405).end(); 
    }
  }
  
