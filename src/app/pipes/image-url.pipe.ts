import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imageUrl',
})
export class ImageUrlPipe implements PipeTransform {
  transform(img: string, type: 'users' | 'doctors' | 'hospitals') {
    return img
      ? `${base_url}/upload/${type}/${img}`
      : `${base_url}/upload/${type}/no-image`;
  }
}
