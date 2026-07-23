use chrono::Utc;

use crate::{
    database::connection::get_connection,
    models::library_settings::LibrarySettings,
};

#[tauri::command]
pub fn library_exists() -> Result<bool, String> {
    let conn = get_connection().map_err(|e| e.to_string())?;

    let count: i32 = conn
        .query_row(
            "SELECT COUNT(*) FROM library_settings",
            [],
            |row| row.get(0),
        )
        .map_err(|e| e.to_string())?;

    Ok(count > 0)
}

#[tauri::command]
pub fn create_library(settings: LibrarySettings) -> Result<(), String> {
    let conn = get_connection().map_err(|e| e.to_string())?;

    conn.execute(
        "
        INSERT INTO library_settings
        (
            id,
            library_name,
            description,
            created_at
        )
        VALUES (?1, ?2, ?3, ?4)
        ",
        rusqlite::params![
            1,
            settings.library_name,
            settings.description,
            Utc::now().to_rfc3339()
        ],
    )
    .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub fn get_library_settings() -> Result<LibrarySettings, String> {
    let conn = get_connection().map_err(|e| e.to_string())?;

    let mut stmt = conn
        .prepare(
            "
            SELECT
                library_name,
                description,
                created_at
            FROM library_settings
            WHERE id = 1
            ",
        )
        .map_err(|e| e.to_string())?;

    let settings = stmt
        .query_row([], |row| {
            Ok(LibrarySettings {
                library_name: row.get(0)?,
                description: row.get(1)?,
                created_at: row.get(2)?,
            })
        })
        .map_err(|e| e.to_string())?;

    Ok(settings)
}