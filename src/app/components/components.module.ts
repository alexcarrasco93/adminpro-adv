import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IncreaserComponent } from './increaser/increaser.component';

@NgModule({
  declarations: [IncreaserComponent],
  imports: [CommonModule, FormsModule],
  exports: [IncreaserComponent],
})
export class ComponentsModule {}
