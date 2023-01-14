import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { StaffComponent } from './staff/staff.component';
import { BillComponent } from './bill/bill.component';
import { Pages404Component } from './pages404/pages404.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    StaffComponent,
    BillComponent,
    Pages404Component,
    IndexComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
