use crate::models::book::Book;

#[tauri::command]
pub fn get_books() -> Vec<Book> {
    Vec::new()
}