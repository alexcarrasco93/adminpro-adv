import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/' },
        { title: 'Graphics', url: 'graphic1' },
        { title: 'RxJs', url: 'rxjs' },
        { title: 'Promises', url: 'promises' },
        { title: 'ProgressBar', url: 'progress' },
      ],
    },
  ];

  constructor() {}
}
