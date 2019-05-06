import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../providers/provider.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  constructor(public settingsService: SettingsService) {}

  ngOnInit() {
    this.putCheck();
  }

  /**
   * Change dashboard's theme color
   * @param theme Name of color theme
   * @param link Reference to element in DOM
   */
  changeColorTheme(theme: string, link: any): void {
    this.applyCheck(link);
    this.settingsService.applyTheme(theme);
  }

  /**
   * Apply a css class to the link in order to put a check in the link
   * @param link Reference to element in the DOM
   */
  applyCheck(link: any): void {
    const arrayLinks = Array.prototype.slice.call(document.getElementsByClassName('selector'));
    arrayLinks.forEach(element => element.classList.remove('working'));
    link.classList.add('working');
  }

  /**
   * Add class working (check) to element identifying theme saved in local storage
   */
  putCheck(): void {
    const arrayLinks = Array.prototype.slice.call(document.getElementsByClassName('selector'));
    const theme = this.settingsService.settings.theme;

    arrayLinks.forEach(element => {
      if (element.getAttribute('data-theme') === theme) {
        element.classList.add('working');
      }
    });
  }
}
