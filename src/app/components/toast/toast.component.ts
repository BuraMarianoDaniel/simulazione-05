import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ToastType, ToastTypes} from "../models/toast-types";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Output() disposeEvent = new EventEmitter();

  @ViewChild('toastElement', { static: true })
  toastEl!: ElementRef;

  @Input()
  type?: ToastType = 'warning';

  @Input()
  title?: string;

  @Input()
  message!: string;

  ngOnInit() {
    this.show();
  }

  show() {
    if (this.type !== ToastTypes.Error) {
      this.toastEl.nativeElement.disposeTimeOut = setTimeout(() => {
        this.hide();
      }, 5000);
    }
  }

  hide() {
    this.disposeEvent.emit();
  }

  ngAfterViewInit(): void {
  }

  stopTimeout() {
    const timeout = this.toastEl.nativeElement?.disposeTimeOut;
    if (timeout) clearTimeout(timeout);
  }

  setShorterTimeout() {
    this.toastEl.nativeElement.disposeTimeOut = setTimeout(() => {
      this.hide();
    }, 2500);
  }
}
