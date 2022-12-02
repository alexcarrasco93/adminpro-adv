import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { DoctorUpdateComponent } from './maintenance/doctors/doctor-update.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { UsersComponent } from './maintenance/users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SearchComponent } from './search/search.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  {
    path: 'progress',
    component: ProgressComponent,
    data: { title: 'Progress Bar' },
  },
  {
    path: 'graphic1',
    component: Graphic1Component,
    data: { title: 'Graphic #1' },
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: { title: 'Settings' },
  },
  {
    path: 'promises',
    component: PromisesComponent,
    data: { title: 'Promises' },
  },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: 'Profile' },
  },
  {
    path: 'users',
    canActivate: [AdminGuard],
    component: UsersComponent,
    data: { title: 'Application users' },
  },
  {
    path: 'hospitals',
    component: HospitalsComponent,
    data: { title: 'Hospitals Maintenance' },
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
    data: { title: 'Doctors Maintenance' },
  },
  {
    path: 'doctor/:id',
    component: DoctorUpdateComponent,
    data: { title: 'Doctor Maintenance' },
  },
  {
    path: 'search/:term',
    component: SearchComponent,
    data: { title: 'Search' },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
})
export class ChildRoutesModule {}
