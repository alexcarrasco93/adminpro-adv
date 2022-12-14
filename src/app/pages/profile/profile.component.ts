import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { User } from '../../models/user.model';
import { FileUploadService } from '../../services/file-upload.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
    `
      .img-container {
        margin: 1rem auto 1rem auto;
      }
    `,
  ],
})
export class ProfileComponent {
  profileForm: FormGroup;
  user: User;
  imgTemp?: File;
  imgSrc?: string | ArrayBuffer | null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
    this.user = this.userService.user;
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [
        { value: this.user.email, disabled: this.user.google },
        [Validators.required, Validators.email],
      ],
    });
  }

  updateProfile() {
    console.log(this.profileForm.value);
    this.userService.updateProfile(this.profileForm.value).subscribe({
      next: ({ user }) => {
        this.user.name = user.name;
        this.user.email = user.email;

        Swal.fire('Saved', 'The changes were saved', 'success');
      },
      error(err) {
        Swal.fire('Error', err.error.msg, 'error');
      },
    });
  }

  changeImage(file: File) {
    this.imgTemp = file;

    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.imgSrc = fileReader.result;
    };

    fileReader.readAsDataURL(this.imgTemp as File);
  }

  uploadImage() {
    this.fileUploadService
      .updateImage(this.imgTemp as File, 'users', this.user.uid as string)
      .subscribe({
        next: (imageName) => {
          this.user.img = imageName as any;
          this.imgTemp = undefined;
          this.imgSrc = undefined;
          Swal.fire('Saved', 'User image updated', 'success');
        },
        error() {
          Swal.fire('Error', "The image couldn't be upload", 'error');
        },
      });
  }
}
