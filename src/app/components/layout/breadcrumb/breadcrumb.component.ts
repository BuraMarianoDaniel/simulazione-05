import { Component, OnInit } from '@angular/core';
import {HeaderService} from "../../../services/header.service";
import {BreadCrumb} from "../../models/nav-bar";
import {animate, animateChild, query, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  animations: [
    trigger('slideIn', [
      state('*', style({
        height: '*',
        opacity: 1,
      })),
      state('void', style({
        height: 0,
        opacity: 0,
      })),
      transition('void => *',  animate('.3s ease-in-out')),
    ]),
    trigger('slideOut', [
      state('*', style({
        opacity: 1,
        height: '*',
      })),
      state('void', style({
        height: 0,
        opacity: 0,
      })),
      transition('* => void', animate('.2s ease')),
    ]),
  ]
})
export class BreadcrumbComponent implements OnInit {
  public breadCrumbList?: BreadCrumb[];

  constructor(
    private headerService: HeaderService
  ) {
    this.headerService.breadCrumbEvents.subscribe(r => {
      this.breadCrumbList = r;
    });
  }

  ngOnInit(): void {}

}
