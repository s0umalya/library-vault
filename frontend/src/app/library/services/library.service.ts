import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

import { LibrarySettings } from '../models/library-settings.model';


@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  libraryExists(): Promise<boolean> {
    return invoke<boolean>('library_exists');
  }

  createLibrary(settings: LibrarySettings): Promise<void> {
    return invoke('create_library', { settings });
  }

  getLibrarySettings(): Promise<LibrarySettings> {
    return invoke<LibrarySettings>('get_library_settings');
  }

}