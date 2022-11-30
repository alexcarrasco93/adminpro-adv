import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import Swal from 'sweetalert2';
import { Doctor } from '../../../models/doctor.model';
import { Hospital } from '../../../models/hospital.model';
import { DoctorsService } from '../../../services/doctors.service';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-doctor-update',
  templateUrl: './doctor-update.component.html',
  styles: [],
})
export class DoctorUpdateComponent implements OnInit {
  doctorForm!: FormGroup;
  hospitals$ = this.hospitalService.getHospitals();
  selectedHospital$?: Observable<Hospital>;
  selectedDoctor$?: Observable<Doctor>;
  idDoctorToUpdate = '';

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      ({ id }) => id !== 'new' && this.getDoctor(id)
    );
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.selectedHospital$ = this.doctorForm
      .get('hospital')
      ?.valueChanges.pipe(
        switchMap((hospitalId) =>
          this.hospitals$.pipe(
            map((hospitals) => hospitals.find((h) => h._id === hospitalId))
          )
        )
      ) as Observable<Hospital>;
  }

  getDoctor(id: string) {
    this.selectedDoctor$ = this.doctorService.getDoctorById(id).pipe(
      tap(({ name, hospital }) => {
        this.doctorForm.setValue({ name, hospital: hospital?._id }),
          (this.idDoctorToUpdate = id);
      }),
      catchError((err) => {
        this.router.navigateByUrl(`/dashboard/doctors`);
        return of(err);
      })
    );
  }

  saveDoctor() {
    const { name, hospital } = this.doctorForm.value;
    if (this.idDoctorToUpdate) {
      console.log('update');
      this.doctorService
        .updateDoctor(this.idDoctorToUpdate, name, hospital)
        .subscribe({
          next: () =>
            Swal.fire('Updated', `${name} was updated correctly`, 'success'),
        });
    } else {
      this.doctorService.createDoctor(name, hospital).subscribe({
        next: (res) => {
          Swal.fire('Created', `${name} was created correctly`, 'success');
          this.router.navigateByUrl(`/dashboard/doctor/${res.doctor._id}`);
        },
      });
    }
  }
}
