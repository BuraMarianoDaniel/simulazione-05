import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Toast} from "../components/models/toast";
import {ToastTypes} from "../components/models/toast-types";

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  toastEvents: Observable<Toast>;
  private _toastEvents = new Subject<Toast>();

  constructor() {
    this.toastEvents = this._toastEvents.asObservable();
  }

  showToast(message: string, title?: string) {
    this._toastEvents.next({
      message,
      title
    });
  }

  showSuccessToast(message: string, title?: string) {
    this._toastEvents.next({
      message,
      title,
      type: ToastTypes.Success,
    });
  }

  showErrorToast(message: string, title?: string) {
    this._toastEvents.next({
      message,
      title,
      type: ToastTypes.Error,
    });
  }

  showWarningToast(message: string, title?: string) {
    this._toastEvents.next({
      message,
      title,
      type: ToastTypes.Warning,
    });
  }

  showInfoToast(message: string, title?: string) {
    this._toastEvents.next({
      message,
      title,
      type: ToastTypes.Info,
    });
  }
}
