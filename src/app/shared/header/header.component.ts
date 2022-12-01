import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `
      @media (min-width: 768px) {
        .ellipsis {
          width: 150px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    `,
  ],
})
export class HeaderComponent {
  user = this.userService.user;

  constructor(private userService: UserService, private router: Router) {}

  logout() {
    this.userService.logout();
  }

  search(term: string) {
    if (term) {
      this.router.navigateByUrl(`/dashboard/search/${term}`);
    }
  }
}
