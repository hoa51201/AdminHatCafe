import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { BillRoutingModule } from './bill-routing.module';
import { IndexComponent } from './index/index.component';
import { UpdateComponent } from './billdetails/billdetails.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    IndexComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    BillRoutingModule,
    NgxPaginationModule,
    FormsModule,
    DataTablesModule
  ]
})
export class BillModule { }
