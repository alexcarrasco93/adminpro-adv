import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IncreaserComponent } from './increaser/increaser.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { NgChartsModule } from 'ng2-charts';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [IncreaserComponent, DoughnutComponent, ImageModalComponent],
  imports: [CommonModule, FormsModule, NgChartsModule, PipesModule],
  exports: [IncreaserComponent, DoughnutComponent, ImageModalComponent],
})
export class ComponentsModule {}
