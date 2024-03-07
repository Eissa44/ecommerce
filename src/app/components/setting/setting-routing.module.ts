import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatepassComponent } from './updatepass/updatepass.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';

const routes: Routes = [
  { path: '', redirectTo: 'update', pathMatch: 'full' },
  { path: 'update', component: UpdatepassComponent },
  { path: 'forgot', component: ForgotpassComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
