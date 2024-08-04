const Database = require("better-sqlite3")
const db = new Database("auth.db")

db.exec(`
    CREATE TABLE IF NOT EXISTS users(
        id TEXT PRIMARY KEY,
        name TEXT,
        surname TEXT,
        email TEXT,
        password TEXT        
    )    
`)

db.exec(`
    CREATE TABLE session (
    id TEXT NOT NULL PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
)    
`)