import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
      .ellipsis {
        width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `,
  ],
})
export class SidebarComponent implements OnInit {
  user = this.userService.user;
  meunItems: any[];

  constructor(
    private sidebarService: SidebarService,
    private userService: UserService
  ) {
    this.meunItems = sidebarService.menu;
  }

  ngOnInit() {}
}
