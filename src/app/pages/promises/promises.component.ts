import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [],
})
export class PromisesComponent implements OnInit {
  ngOnInit() {
    this.getUsers().then(console.log)
  }

  getUsers() {
    return new Promise((resolve) =>
      fetch('https://reqres.in/api/users?page=2')
        .then((resp) => resp.json())
        .then((body) => resolve(body.data))
    );
  }
}
