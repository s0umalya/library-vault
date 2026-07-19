use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Book {
    pub id: i32,
    pub title: String,
    pub author: String,
    pub genre: String,
}