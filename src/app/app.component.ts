import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-adminpro-app';

  constructor(private translate: TranslateService) {
    // * set default language
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }
}
