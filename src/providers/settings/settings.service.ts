import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.loadSettings();
  }

  /**
   * Save settings in local storage
   */
  saveSettings(): void {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  /**
   * Get settings from local storage
   */
  loadSettings(): void {
    if (localStorage.getItem('settings')) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
      this.applyTheme(this.settings.theme);
    } else {
      this.applyTheme(this.settings.theme);
    }
  }

  applyTheme(theme: string): void {
    const url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url);

    this.settings.theme = theme;
    this.settings.themeUrl = url;

    this.saveSettings();
  }
}
