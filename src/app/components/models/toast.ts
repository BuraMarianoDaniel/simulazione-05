import {ToastType, ToastTypes} from "./toast-types";

export interface Toast {
  type?: ToastType;
  title?: string;
  message: string;
}
