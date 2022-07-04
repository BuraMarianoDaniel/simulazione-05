import {Component, Input, OnInit} from '@angular/core';
import {FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit {

  @Input() public label?: string;
  @Input() public for?: string;
  @Input() public controlName?: string;

  constructor(
    private fg: FormGroupDirective
  ) {
  }

  ngOnInit(): void {}

  public isInvalid() {
    if (!this.controlName) return;
    return this.fg.form.get(this.controlName)?.invalid
  }

  public isDirty() {
    if (!this.controlName) return;
    return this.fg.form.get(this.controlName)?.dirty
  }

  public getErrorMsg() {
    if (!this.controlName) return;
    const errors = this.fg.form.get(this.controlName)?.errors || {};
    for (let [key, value] of Object.entries(errors)) {
      console.error(key, value)
      switch (key) {
        case 'required':
          return 'Questo campo è richiesto';
        case 'email':
          return 'Email non valida';
        case 'max':
          return `Questo campo deve essere massimo ${value.max}`;
        case 'min':
          return `Questo campo deve essere minimo ${value.min}`;
        case 'maxlength':
          return `Questo campo deve avere massimo ${value.requiredLength} caratteri`;
        case 'minlength':
          return `Questo campo deve avere minimo ${value.requiredLength} caratteri`;
        case 'backend':
          return value;
        default:
          return 'Questo campo non è valido';
      }
    }
    return '';
  }
}
