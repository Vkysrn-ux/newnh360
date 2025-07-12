// lib/db.ts
import mysql from "mysql2/promise"

export const db = mysql.createPool({
  host: "localhost",     // your DB host
  user: "root",          // your DB user
  password: "Mind%^%^", // your DB password
  database: "cortez",    // your DB name
})
