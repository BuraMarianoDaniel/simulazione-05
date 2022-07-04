import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToasterService} from "../../../services/toaster.service";
import {LoyaltyCardCreateRequest} from "../../../models/loyalty-card";
import {LoyaltyCardService} from "../../../services/loyalty-card.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loyalty-card-insert',
  templateUrl: './loyalty-card-insert.component.html',
  styleUrls: ['./loyalty-card-insert.component.scss']
})
export class LoyaltyCardInsertComponent implements OnInit {
  public createLoyaltyCardForm?: FormGroup;

  constructor(
    private toastService: ToasterService,
    private formBuilder: FormBuilder,
    private loyaltyCardService: LoyaltyCardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createLoyaltyCardForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      surname: ['', [
        Validators.required,
        Validators.minLength(3)
      ]]
    });
  }

  addLoyaltyCard() {
    if (this.createLoyaltyCardForm?.invalid) {
      this.toastService.showErrorToast('Errore, correggi i campi per continuare!');
      this.createLoyaltyCardForm.markAsDirty();
      return;
    }
    const body: LoyaltyCardCreateRequest = this.createLoyaltyCardForm?.value;
    this.loyaltyCardService.create(body).subscribe(r => {
      this.router.navigate(['/loyalty-card']).then(() => {
        this.toastService.showSuccessToast('Carta fedeltà aggiunta con successo!', 'Inserimento');
      });
    }, (e: HttpErrorResponse) => {
      switch (e.status) {
        case 422:
          for (let [key, value] of Object.entries(e.error)) {
            const formControl = this.createLoyaltyCardForm?.get(key);
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
  }
}
