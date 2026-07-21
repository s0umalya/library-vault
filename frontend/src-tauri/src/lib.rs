mod database;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|_app| {
            database::initialize_database()
                .expect("Failed to initialize database");

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}