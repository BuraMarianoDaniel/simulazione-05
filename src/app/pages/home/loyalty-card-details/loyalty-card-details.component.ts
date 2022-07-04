import { Component, OnInit } from '@angular/core';
import {MovementRechargeRequest, MovementResponse} from "../../../models/movement";
import {MovementService} from "../../../services/movement.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToasterService} from "../../../services/toaster.service";
import {addMonths, compareAsc, format} from 'date-fns'
import {PrizeService} from "../../../services/prize.service";
import {PrizeResponse} from "../../../models/prize";
import {environment} from "../../../../environments/environment";
import {HttpErrorResponse} from "@angular/common/http";
import {LoyaltyCardService} from "../../../services/loyalty-card.service";
import {forkJoin} from "rxjs";
import {LoyaltyCardResponse} from "../../../models/loyalty-card";

@Component({
  selector: 'app-loyalty-card-details',
  templateUrl: './loyalty-card-details.component.html',
  styleUrls: ['./loyalty-card-details.component.scss']
})
export class LoyaltyCardDetailsComponent implements OnInit {
  public movements?: MovementResponse[];
  public loyaltyCard?: LoyaltyCardResponse;

  private loyaltyCardId?: number;
  public rechargeModalOpen: boolean = false;
  public rechargeForm?: FormGroup;
  public prizes?: PrizeResponse[];

  public imageUrl: string = environment.imageUrl;

  public minDate: string = format(new Date(), 'yyyy-MM-dd');
  public maxDate: string = format(addMonths(new Date(), 1), 'yyyy-MM-dd');
  public size: number = 10;

  constructor(
    private movementService: MovementService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastService: ToasterService,
    private prizeService: PrizeService,
    private loyaltyCardService: LoyaltyCardService
  ) {
    this.router.params.subscribe(({id}) => {
      this.loyaltyCardId = parseInt(id);
    });
    this.rechargeForm = this.formBuilder.group({
      points: [
        10, [
          Validators.required,
          Validators.min(1)
        ]
      ]
    });
  }

  ngOnInit(): void {
    if (!this.loyaltyCardId) return;

    forkJoin([
      this.loyaltyCardService.details(this.loyaltyCardId),
      this.movementService.filter(this.loyaltyCardId, this.minDate, this.maxDate, this.size)
    ]).subscribe(([loyaltyCardDetails, movements]) => {
      this.movements = movements;
      this.loyaltyCard = loyaltyCardDetails;
    }, ([e1, e2]) => {
      switch (e1.status) {
        case 422:
          for (let [key, value] of Object.entries(e1.error)) {
            const formControl = this.rechargeForm?.get(key);
            console.error(key, value)
            if (formControl) {
              formControl.markAsDirty();
              formControl.setErrors({backend: value});
            } else {
              this.toastService.showErrorToast(`${value}`);
            }
          }
          break;
        default:
          break;
      }
    });

    /*this.movementService.filter(this.loyaltyCardId, this.minDate, this.maxDate, this.size).subscribe(r => {
      this.movements = r;
    }, e => {
      switch (e.status) {
        case 422:
          for (let [key, value] of Object.entries(e.error)) {
            const formControl = this.rechargeForm?.get(key);
            console.error(key, value)
            if (formControl) {
              formControl.markAsDirty();
              formControl.setErrors({backend: value});
            } else {
              this.toastService.showErrorToast(`${value}`);
            }
          }
          break;
        default:
          break;
      }
    });*/

    this.prizeService.index().subscribe(r => {
      this.prizes = r;
    });
  }

  recharge(): void {
    if (this.rechargeForm?.invalid) {
      this.toastService.showErrorToast('Errore, correggi i campi per continuare!');
      this.rechargeForm.markAsDirty();
      return;
    }
    const body: MovementRechargeRequest = this.rechargeForm?.value;
    if (!this.loyaltyCardId) {
      this.toastService.showErrorToast('Errore, carta non valida!');
      return;
    }
    this.movementService.createRecharge(this.loyaltyCardId, body).subscribe(r => {
      this.ngOnInit();
      this.toastService.showSuccessToast('Ricarica eseguita con sucesso');
      this.rechargeModalOpen = false;
    });
  }

  redeem(id: number) {
    if (!this.loyaltyCardId) {
      this.toastService.showErrorToast('Errore, carta non valida!');
      return;
    }
    this.movementService.createRedeem(this.loyaltyCardId, id).subscribe(r => {
      this.toastService.showSuccessToast('Premio riscattato con successo!');
      this.ngOnInit();
    }, (e: HttpErrorResponse) => {
      switch (e.status) {
        default:
          this.toastService.showErrorToast(e.error, 'Errore');
          break;
      }
    });
  }

  refreshFilter() {
    this.ngOnInit();
  }
}
