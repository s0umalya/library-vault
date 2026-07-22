use rusqlite::Result;

use crate::database::connection::get_connection;
use tauri::AppHandle;

pub fn initialize_database(app: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let conn = get_connection()?;

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