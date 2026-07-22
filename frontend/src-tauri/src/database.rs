use rusqlite::{Connection, Result};

pub fn initialize_database() -> Result<()> {
    let conn = Connection::open("../library.db")?;

    conn.execute(
        "
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            genre TEXT,
            publisher TEXT,
            isbn TEXT,
            publication_year INTEGER,
            status TEXT NOT NULL DEFAULT 'Available',
            created_at TEXT NOT NULL
        )
        ",
        [],
    )?;

    println!("Database initialized successfully.");

    Ok(())
}