import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavBar} from "../../models/nav-bar";
import {HeaderService} from "../../../services/header.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() public open!: boolean;
  @Input() public selected!: string;
  @Input() public navBarList!: NavBar[];

  @Output() openChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.open = !this.open;
    this.openChange.emit(this.open);
  }
}
