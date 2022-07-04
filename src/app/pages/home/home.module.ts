import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';
import {LoyaltyCardInsertComponent} from "./loyalty-card-insert/loyalty-card-insert.component";
import {LoyaltyCardIndexComponent} from "./loyalty-card-index/loyalty-card-index.component";
import {SharedModule} from "../../shared/shared.module";
import { LoyaltyCardDetailsComponent } from './loyalty-card-details/loyalty-card-details.component';


@NgModule({
  declarations: [
    LoyaltyCardInsertComponent,
    LoyaltyCardIndexComponent,
    LoyaltyCardDetailsComponent
  ],
  imports: [
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
