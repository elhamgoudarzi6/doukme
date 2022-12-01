import { NgOtpInputModule } from 'ng-otp-input';
import { AngularMaterialListModule } from './../../angular-material-list.module';
import { PrimengListModule } from './../../primeng-list.module';
import { UserRoutingModule } from './user-routing.module';
import {NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    PrimengListModule,
    AngularMaterialListModule,
  ],
  entryComponents: [

  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule {}
