use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LibrarySettings {
    pub library_name: String,
    pub description: Option<String>,
    pub created_at: Option<String>,
}