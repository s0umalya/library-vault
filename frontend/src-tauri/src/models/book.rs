use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Book {
    pub id: Option<i32>,
    pub title: String,
    pub author: String,
    pub genre: Option<String>,
    pub publisher: Option<String>,
    pub isbn: Option<String>,
    pub publication_year: Option<i32>,
    pub status: Option<String>,
    pub created_at: Option<String>,
}