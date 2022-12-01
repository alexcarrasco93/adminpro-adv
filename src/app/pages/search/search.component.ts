import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';
import { User } from '../../models/user.model';
import { SearchesService } from '../../services/searches.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  users?: User[];
  hospitals?: Hospital[];
  doctors?: Doctor[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private searchesService: SearchesService,
    
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ term }) => this.globalSearch(term));
  }

  globalSearch(term: string) {
    this.searchesService
      .globalSearch(term)
      .subscribe(({ users, hospitals, doctors }) => {
        this.users = users;
        this.hospitals = hospitals;
        this.doctors = doctors;
      });
  }

  openDoctor(doctor: Doctor) {

  }
}
