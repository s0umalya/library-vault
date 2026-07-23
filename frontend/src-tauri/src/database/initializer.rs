use rusqlite::Result;

use crate::database::connection::get_connection;
use tauri::AppHandle;

pub fn initialize_database(_app: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let conn = get_connection()?;

    conn.execute(
        "
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            genre TEXT,
            publisher TEXT,
            language TEXT,
            isbn TEXT,
            publication_year INTEGER,
            status TEXT NOT NULL DEFAULT 'Available',
            created_at TEXT NOT NULL
        )
        ",
        [],
    )?;

    conn.execute(
        "
        CREATE TABLE IF NOT EXISTS library_settings (
            id INTEGER PRIMARY KEY CHECK(id = 1),
            library_name TEXT NOT NULL,
            description TEXT,
            created_at TEXT NOT NULL
        )
        ",
        [],
    )?;

    // Migration: Add language column for existing databases.
    let mut stmt = conn.prepare("PRAGMA table_info(books)")?;
    let columns = stmt.query_map([], |row| row.get::<_, String>(1))?;

    let mut language_exists = false;

    for column in columns {
        if column? == "language" {
            language_exists = true;
            break;
        }
    }

    if !language_exists {
        conn.execute(
            "ALTER TABLE books ADD COLUMN language TEXT",
            [],
        )?;
        println!("Migration completed: language column added.");
    }

    println!("Database initialized successfully.");

    Ok(())
}