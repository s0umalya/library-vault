use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct Book {
    pub id: i32,
    pub title: String,
    pub author: String,
    pub genre: Option<String>,
    pub publisher: Option<String>,
    pub isbn: Option<String>,
    pub publication_year: Option<i32>,
    pub status: String,
    pub created_at: String,
}