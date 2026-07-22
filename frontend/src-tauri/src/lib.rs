mod commands;
mod database;
mod models;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            database::initializer::initialize_database(app.handle())
                .expect("Failed to initialize database");

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
          commands::book_commands::get_books,
          commands::book_commands::add_book,
          commands::book_commands::update_book,
          commands::book_commands::delete_book
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}