import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';
import { Doctor } from '../../../models/doctor.model';
import { DoctorsService } from '../../../services/doctors.service';
import { ImageModalService } from '../../../services/image-modal.service';
import { SearchesService } from '../../../services/searches.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  doctors: Doctor[] = [];
  loading = true;
  doctorsTemp: Doctor[] = [];
  private imgSubs?: Subscription;

  constructor(
    private doctorService: DoctorsService,
    private imageModalService: ImageModalService,
    private searchesService: SearchesService
  ) {}

  ngOnInit() {
    this.getDoctors();

    this.imgSubs = this.imageModalService.newImage
      .pipe(delay(100))
      .subscribe(() => this.getDoctors());
  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  getDoctors() {
    this.loading = true;
    this.doctorService
      .getDoctors()
      .subscribe(
        (doctors) => (
          (this.doctors = doctors),
          (this.doctorsTemp = doctors),
          (this.loading = false)
        )
      );
  }

  // saveChanges(doctor: Doctor) {
  //   this.doctorService
  //     .updateDoctor(doctor._id!, doctor.name, doctor.hospital?._id as string)
  //     .subscribe({
  //       next() {
  //         Swal.fire('Updated', doctor.name, 'success');
  //       },
  //     });
  // }

  deleteDoctor(doctor: Doctor) {
    this.doctorService.deleteDoctor(doctor._id!).subscribe({
      next: () => {
        this.getDoctors();
        Swal.fire('Erased', doctor.name, 'success');
      },
    });
  }

  openModal(doctor: Doctor) {
    this.imageModalService.openModal('doctors', doctor._id!, doctor.img!);
  }

  search(term: string) {
    if (term.length === 0) {
      this.doctors = [...this.doctorsTemp];
      return;
    }
    this.searchesService
      .search('doctors', term)
      .subscribe((res) => (this.doctors = res as Doctor[]));
  }
}
