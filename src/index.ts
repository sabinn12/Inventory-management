import express from "express";
import pool from "./config/database";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    if(err instanceof Error)
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
