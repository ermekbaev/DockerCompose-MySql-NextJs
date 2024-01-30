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
      const [rows, fields] = await pool.query("SELECT * FROM roles");
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data" });
    }
  } else {
    res.status(405).end(); 
  }
}
