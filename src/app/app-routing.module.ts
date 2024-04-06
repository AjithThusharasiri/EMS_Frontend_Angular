import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewEmployeeComponent } from './Components/view-employee/view-employee.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // {path:"", component:HomeComponent},
  {path:"viewEmployee", component:ViewEmployeeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
