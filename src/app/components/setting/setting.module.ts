import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { UpdatepassComponent } from './updatepass/updatepass.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';


@NgModule({
  declarations: [
    UpdatepassComponent,
    ForgotpassComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }
