import { createPool } from "mysql2/promise";

const pool = createPool({
  host: 'mysql',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'users',
  connectionLimit: 25,
});

export default async function handler(req: any, res: any) {
    if (req.method === "GET") {
      try {
        const userId = req.query.id;
  
        const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [userId]);
  
        // if (user) {
        //   res.status(200).json(user);
        // } else {
        //   res.status(404).json({ message: "User not found" });
        // }
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Error fetching user" });
      }
    } else if (req.method === "DELETE") { 
      try {
        const userId = req.query.id;
  
        const result = await pool.query("DELETE FROM users WHERE id = ?", [userId]);
  //@ts-ignore
        if (result.affectedRows > 0) {
          res.status(200).json({ message: "User deleted successfully" });
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Error deleting user" });
      }
    }else if (req.method === "PUT") {
      try {
        const userId = req.query.id;
        const { name, email, number, address, departmentId, roleId } = req.body; 
        const userUpdateResult = await pool.query(
          "UPDATE users SET name = ?, email = ?, number = ?, address = ?, department_id = ?, role_id = ? WHERE id = ?",
          [name, email, number, address, departmentId, roleId, userId]
        );
    //@ts-ignore
        if (userUpdateResult.affectedRows > 0) {
          res.status(200).json({ message: "User updated successfully" });
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Error updating user" });
      }
    }
     else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }