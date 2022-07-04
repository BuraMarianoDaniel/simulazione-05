import {Component, OnInit} from '@angular/core';
import {LoyaltyCardService} from "../../../services/loyalty-card.service";
import {LoyaltyCardResponse} from "../../../models/loyalty-card";

@Component({
  selector: 'app-loyalty-card-index',
  templateUrl: './loyalty-card-index.component.html',
  styleUrls: ['./loyalty-card-index.component.scss']
})
export class LoyaltyCardIndexComponent implements OnInit {
  public loyaltyCards?: LoyaltyCardResponse[];

  public size: number = 10;

  constructor(
    private loyaltyCardService: LoyaltyCardService
  ) {}

  ngOnInit(): void {
    this.loyaltyCardService.index(this.size).subscribe(r => {
      this.loyaltyCards = r;
    });
  }

  public refreshFilter() {
    this.ngOnInit();
  }
}
