import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Hospital } from '../../../models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { ImageModalService } from '../../../services/image-modal.service';
import { SearchesService } from '../../../services/searches.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [],
})
export class HospitalsComponent implements OnInit, OnDestroy {
  hospitals: Hospital[] = [];
  loading = true;
  hospitalsTemp: Hospital[] = [];
  private imgSubs?: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private imageModalService: ImageModalService,
    private searchesService: SearchesService
  ) {}

  ngOnInit() {
    this.getHospitals();

    this.imgSubs = this.imageModalService.newImage
      .pipe(delay(100))
      .subscribe(() => this.getHospitals());
  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  getHospitals() {
    this.loading = true;
    this.hospitalService
      .getHospitals()
      .subscribe(
        (hospitals) => (
          (this.hospitals = hospitals),
          (this.hospitalsTemp = hospitals),
          (this.loading = false)
        )
      );
  }

  saveChanges(hospital: Hospital) {
    this.hospitalService
      .updateHospital(hospital._id!, hospital.name)
      .subscribe({
        next() {
          Swal.fire('Updated', hospital.name, 'success');
        },
      });
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id!).subscribe({
      next: () => {
        this.getHospitals();
        Swal.fire('Erased', hospital.name, 'success');
      },
    });
  }

  async openSweetAlert() {
    const { value } = await Swal.fire<string>({
      title: 'Create new Hospital',
      input: 'text',
      inputLabel: 'Name of the Hospital',
      inputPlaceholder: 'Brest Hospital',
      showCancelButton: true,
    });

    if (value) {
      this.hospitalService
        .createHospital(value as string)
        .subscribe(({ hospital }) => this.hospitals.push(hospital));
    }
  }

  openModal(hospital: Hospital) {
    this.imageModalService.openModal('hospitals', hospital._id!, hospital.img!);
  }

  search(term: string) {
    if (term.length === 0) {
      this.hospitals = [...this.hospitalsTemp];
      return;
    }
    this.searchesService
      .search('hospitals', term)
      .subscribe((res) => (this.hospitals = res as Hospital[]));
  }
}
