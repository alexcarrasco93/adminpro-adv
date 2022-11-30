import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../../models/user.model';
import { FileUploadService } from '../../services/file-upload.service';
import { ImageModalService } from '../../services/image-modal.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styles: [],
})
export class ImageModalComponent {
  imgTemp?: File;
  imgSrc?: string | ArrayBuffer | null;

  get data() {
    return {
      id: this.imageModalService.id,
      type: this.imageModalService.type,
      img: this.imageModalService.img,
      isGoogleImage: this.imageModalService.isGoogleImage,
    };
  }

  constructor(
    public imageModalService: ImageModalService,
    private fileUploadService: FileUploadService
  ) {}

  closeModal() {
    this.imgSrc = null;
    this.imgTemp = undefined;
    this.imageModalService.closeModal();
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
      .updateImage(this.imgTemp as File, this.data.type, this.data.id as string)
      .then(
        (imageName: string) => (
          Swal.fire('Saved', 'Image updated', 'success'),
          this.closeModal(),
          this.imageModalService.newImage.emit(imageName)
        )
      )
      .catch((err) =>
        Swal.fire('Error', "The image couldn't be upload", 'error')
      );
  }
}
