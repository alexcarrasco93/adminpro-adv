import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurePipe } from './secure.pipe';
import { ImageUrlPipe } from './image-url.pipe';

@NgModule({
  declarations: [SecurePipe, ImageUrlPipe],
  imports: [CommonModule],
  exports: [SecurePipe, ImageUrlPipe],
})
export class PipesModule {}
