import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { UserService } from 'src/providers/provider.index';
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    this.user = this.userService.user;
  }

  search(termino: string) {
    this.router.navigate(['/search', termino]);
  }
}
