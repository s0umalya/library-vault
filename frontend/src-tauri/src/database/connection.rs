use rusqlite::{Connection, Result};
use std::path::PathBuf;

pub fn get_connection() -> Result<Connection> {
    let mut db_path = dirs::data_local_dir().unwrap_or(PathBuf::from("."));

    db_path.push("Library Vault");

    std::fs::create_dir_all(&db_path).unwrap();

    db_path.push("library.db");

    Connection::open(db_path)
}