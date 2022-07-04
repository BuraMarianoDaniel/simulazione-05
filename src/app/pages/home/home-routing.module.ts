import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoyaltyCardIndexComponent} from "./loyalty-card-index/loyalty-card-index.component";
import {LoyaltyCardInsertComponent} from "./loyalty-card-insert/loyalty-card-insert.component";
import {LoyaltyCardDetailsComponent} from "./loyalty-card-details/loyalty-card-details.component";

const routes: Routes = [
  {
    path: '',
    component: LoyaltyCardIndexComponent,
    title: 'Carte fedeltà',
    data: {
      navbar: {
        selected: 'loyalty-card',
      },
      breadCrumb: [
        {
          title: 'Carte Fedeltà',
          icon: ['fas', 'house'],
        }
      ]
    }
  },
  {
    path: 'insert',
    component: LoyaltyCardInsertComponent,
    title: 'Nuova carta fedeltà',
    data: {
      navbar: {
        selected: 'loyalty-card',
      },
      breadCrumb: [
        {
          title: 'Carte fedeltà',
          icon: ['fas', 'house'],
          route: '/loyalty-card'
        },
        {
          title: 'Nuova carta fedeltà',
          icon: ['fas', 'circle-plus']
        }
      ]
    }
  },
  {
    path: ':id/details',
    component: LoyaltyCardDetailsComponent,
    title: 'Dettagli',
    data: {
      navbar: {
        selected: 'loyalty-card',
      },
      breadCrumb: [
        {
          title: 'Carte fedeltà',
          icon: ['fas', 'house'],
          route: '/loyalty-card'
        },
        {
          title: 'Dettagli',
          icon: ['fas', 'id-card']
        }
      ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
