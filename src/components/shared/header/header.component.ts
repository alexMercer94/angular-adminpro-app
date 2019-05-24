import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { UserService } from 'src/providers/provider.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.user;
  }
}
