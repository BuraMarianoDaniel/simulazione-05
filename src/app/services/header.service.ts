import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {BreadCrumb, NavBar} from "../components/models/nav-bar";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public navBarEvents: Observable<string>;
  private _navBarEvents = new Subject<string>();

  public breadCrumbEvents: Observable<BreadCrumb[]>;
  private _breadCrumbEvents = new Subject<BreadCrumb[]>();

  constructor() {
    this.breadCrumbEvents = this._breadCrumbEvents.asObservable();
    this.navBarEvents = this._navBarEvents.asObservable();
  }

  public loadBreadCrumb(breadCrumb: BreadCrumb[]): void {
    this._breadCrumbEvents.next(breadCrumb);
  }

  public loadNavbar(selected: string) {
    this._navBarEvents.next(selected);
  }
}
