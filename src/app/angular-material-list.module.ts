import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import {MatSliderModule} from '@angular/material/slider';

let list = [
  MatExpansionModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatDividerModule,
  MatSliderModule,
  MatListModule,
  MatStepperModule,
];
@NgModule({
  declarations: [],
  imports: list,
  exports: list,
})
export class AngularMaterialListModule {}
