import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { UpdateComponent } from './billdetails/billdetails.component';

const routes: Routes = [
  {
    
    path:"index",
    component : IndexComponent,
  },
  {
    path:"billdetails",
    component : UpdateComponent,
  },
  { 
    path:"billdetails/:id",
    component : UpdateComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRoutingModule { }
