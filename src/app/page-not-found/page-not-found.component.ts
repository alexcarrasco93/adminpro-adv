import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.scss'],
})
export class PageNotFoundComponent {
  year = new Date().getFullYear()
}
