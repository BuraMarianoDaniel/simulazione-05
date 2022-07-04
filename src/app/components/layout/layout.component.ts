import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NavBar} from "../models/nav-bar";
import {HeaderService} from "../../services/header.service";
import {SwipeEvent} from "ng-swipe";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public open = false;

  public selected: string = '';

  public navBarList: NavBar[] = [
    {
      title: 'Home',
      route: '/loyalty-card',
      refName: 'loyalty-card'
    }
  ];

  constructor(
    private headerService: HeaderService,
    private cd: ChangeDetectorRef
  ) {
    this.headerService.navBarEvents.subscribe(r => {
      this.selected = r || '';
    });
  }

  ngOnInit(): void {}

  onSwipeEnd(event: SwipeEvent) {
    if (event.direction === 'x' && event.distance <= -150) {
      this.open = false;
      this.cd.detectChanges()
    }
    if (event.direction === 'x' && event.distance >= 150) {
      this.open = true;
      this.cd.detectChanges()
    }
  }
}
