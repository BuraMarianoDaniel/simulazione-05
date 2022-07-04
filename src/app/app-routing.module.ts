import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {E400Component} from "./pages/e400/e400.component";
import {HeaderGuard} from "./guards/header.guard";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'loyalty-card'
  },
  {
    path: 'loyalty-card',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivateChild: [HeaderGuard],
  },
  {
    path: '**',
    component: E400Component,
    title: '404'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
