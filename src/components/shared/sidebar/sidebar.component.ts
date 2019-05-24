import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { SidebarService, UserService } from 'src/providers/provider.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  user: User;

  constructor(public sidebarService: SidebarService, public userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.user;
  }
}
