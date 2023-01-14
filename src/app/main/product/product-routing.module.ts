import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from '../category/category.component';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { ProductComponent } from './product.component';
import { UpdateComponent } from './update/update.component';
// import { UpdateComponent } from ''

const routes: Routes = [
  {
  path:"",
    component: ProductComponent,children:[
      { 
        path:"index",
        component : IndexComponent,
      },
      { 
        path:"create",
        component : CreateComponent,
      },
      { 
        path:"update/:product_slug/:id",
        component : UpdateComponent,
      },
      { 
        path:"update",
        component : UpdateComponent,
      },
      {
        path:"**",
        component : IndexComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
