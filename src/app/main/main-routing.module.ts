import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { IndexComponent } from './index/index.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,children:[
      // { 
      //   path:"404",
      //   component: NotFoundComponent
      // },
      // { 
      //   path:"home",
      //   loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      //   canActivate:[AuthGuard]
      // },
      // { 
      //   path:"category",
      //   loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
      //   canActivate:[AuthGuard]
      // }
      { 
        path:"",
        component : IndexComponent,
        canActivate:[AuthGuard]
      },
      { 
        path:"index",
        component : IndexComponent,
        canActivate:[AuthGuard]
      },
      { 
        path:"category",
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
        canActivate:[AuthGuard]
      },
      { 
        path:"product",
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
        canActivate:[AuthGuard]
      },
      { 
        path:"bill",
        loadChildren: () => import('./bill/bill.module').then(m => m.BillModule),
        canActivate:[AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
