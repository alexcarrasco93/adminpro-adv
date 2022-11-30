import { Hospital } from './hospital.model';

interface DoctorUser {
  name: string;
  _id: string;
  img: string;
}

export class Doctor {
  constructor(
    public name: string,
    public _id?: string,
    public img?: string,
    public user?: DoctorUser,
    public hospital?: Hospital
  ) {}
}
