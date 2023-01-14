import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryRoutingModule } from './category-routing.module';
import { IndexComponent } from './index/index.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { ImgurApiService }from 'src/app/core/services/imgur-api.service';


@NgModule({
  declarations: [
    IndexComponent,
    UpdateComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    NgxPaginationModule,
    FormsModule
  ],
  
})
export class CategoryModule { }
