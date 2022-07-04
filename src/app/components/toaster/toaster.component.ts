import { Component, OnInit } from '@angular/core';
import {Toast} from "../models/toast";
import {ToasterService} from "../../services/toaster.service";
import {animate, animateChild, query, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  animations: [
    trigger('slideIn', [
      state('*', style({
        transform: 'translateY(0) scale(1) rotateY(0)',
        opacity: 1,
        filter: 'blur(0) saturate(100%)'
      })),
      state('void', style({
        transform: 'translateY(20px) scale(1.1) rotateY(5deg)',
        opacity: 0,
        filter: 'blur(2px) saturate(50%)'
      })),
      transition('void => *',  animate('.3s ease-in-out')),
    ]),
    trigger('slideOut', [
      state('*', style({
        transform: 'scale(1)',
        opacity: 1,
      })),
      state('void', style({
        transform: 'scale(.7)',
        opacity: 0,
      })),
      transition('* => void', animate('.2s ease')),
    ]),
    trigger('verticalCollapse', [
      state('*', style({
        height: '*',
      })),
      state('void', style({
        height: '0',
      })),
      transition('* => void', animate('.3s .3s ease')),
    ]),
    trigger('triggerChildAnimation', [
      transition(':enter, :leave', [animate('0s'), query('*', [animateChild()])]),
    ])
  ]
})
export class ToasterComponent implements OnInit {
  public currentToasts: Toast[] = [];

  constructor(
    private toastService: ToasterService
  ) { }

  ngOnInit(): void {
    this.toastService.toastEvents.subscribe((toasts) => {
      const currentToast: Toast = {
        type: toasts.type,
        title: toasts.title,
        message: toasts.message,
      };
      this.currentToasts?.push(currentToast);
    });
  }

  dispose(index: number) {
    this.currentToasts.splice(index, 1);
  }
}
