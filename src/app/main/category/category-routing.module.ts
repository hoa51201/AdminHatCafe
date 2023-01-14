import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path:"",
    component: CategoryComponent,children:[
      { 
        path:"index",
        component : IndexComponent,
      },
      { 
        path:"",
        component : IndexComponent,
      },
      { 
        path:"create",
        component : CreateComponent,
      },
      // { 
      //   path:"update/:id",
      //   component : UpdateComponent,
      // },
      { 
        path:"update/:categories_slug/:id",
        component : UpdateComponent,
      }
    ]
} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
