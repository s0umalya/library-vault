use crate::models::book::Book;
use rusqlite::{params, Connection};

#[tauri::command]
pub fn get_books() -> Result<Vec<Book>, String> {
    let conn = Connection::open("../library.db")
        .map_err(|e| e.to_string())?;

    let mut stmt = conn
        .prepare(
            "
            SELECT
                id,
                title,
                author,
                genre,
                publisher,
                isbn,
                publication_year,
                status,
                created_at
            FROM books
            ORDER BY title
            ",
        )
        .map_err(|e| e.to_string())?;

    let books = stmt
        .query_map([], |row| {
            Ok(Book {
                id: Some(row.get(0)?),
                title: row.get(1)?,
                author: row.get(2)?,
                genre: row.get(3)?,
                publisher: row.get(4)?,
                isbn: row.get(5)?,
                publication_year: row.get(6)?,
                status: Some(row.get(7)?),
                created_at: Some(row.get(8)?),
            })
        })
        .map_err(|e| e.to_string())?;

    let mut result = Vec::new();

    for book in books {
        result.push(book.map_err(|e| e.to_string())?);
    }
    println!("Books loaded: {}", result.len());
    Ok(result)
}

#[tauri::command]
pub fn add_book(book: Book) -> Result<(), String> {
    let conn = Connection::open("../library.db")
        .map_err(|e| e.to_string())?;

    println!("Adding book: {:?}", book);

    let rows = conn.execute(
        "
        INSERT INTO books (
            title,
            author,
            genre,
            publisher,
            isbn,
            publication_year,
            status,
            created_at
        )
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, datetime('now'))
        ",
        params![
            book.title,
            book.author,
            book.genre,
            book.publisher,
            book.isbn,
            book.publication_year,
            "Available"
        ],
    )
    .map_err(|e| e.to_string())?;

    println!("Rows inserted: {}", rows);

    Ok(())
}

#[tauri::command]
pub fn update_book(book: Book) -> Result<(), String> {
    let conn = Connection::open("../library.db")
        .map_err(|e| e.to_string())?;

    let rows = conn.execute(
        "
        UPDATE books
        SET
            title = ?1,
            author = ?2,
            genre = ?3,
            publisher = ?4,
            isbn = ?5,
            publication_year = ?6,
            status = ?7
        WHERE id = ?8
        ",
        params![
            book.title,
            book.author,
            book.genre,
            book.publisher,
            book.isbn,
            book.publication_year,
            book.status.unwrap_or("Available".to_string()),
            book.id
        ],
    )
    .map_err(|e| e.to_string())?;

    println!("Rows updated: {}", rows);

    Ok(())
}