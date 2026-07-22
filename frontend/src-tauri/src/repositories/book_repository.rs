use rusqlite::{params, Connection, Result};

use crate::models::book::Book;

pub fn add_book(book: &Book) -> Result<()> {

    let conn = Connection::open("library.db")?;

    conn.execute(
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
    )?;

    Ok(())
}