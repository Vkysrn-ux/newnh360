// lib/db.ts
import mysql from "mysql2/promise"

const {
  MYSQL_HOST = "localhost",
  MYSQL_PORT = "3306",
  MYSQL_USER = "root",
  MYSQL_PASSWORD = "Mind%^%^",
  MYSQL_DATABASE = "ecomnh360web",
  MYSQL_SSL = "false",
} = process.env as Record<string, string | undefined>

export const db = mysql.createPool({
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  ssl: MYSQL_SSL === "true" ? { rejectUnauthorized: false } : undefined,
})


