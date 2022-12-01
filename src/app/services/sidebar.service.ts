import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [];

  loadMenu() {
    const menu = localStorage.getItem('menu');
    this.menu = menu && (JSON.parse(menu) || []);
  }
}
