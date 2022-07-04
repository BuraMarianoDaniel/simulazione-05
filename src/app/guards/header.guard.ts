import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {HeaderService} from "../services/header.service";

@Injectable({
  providedIn: 'root'
})
export class HeaderGuard implements CanActivateChild {

  constructor(
    private headerService: HeaderService
  ) { }


  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.headerService.loadBreadCrumb(route.data?.['breadCrumb']);
    this.headerService.loadNavbar(route.data?.['navbar'].selected);
    return true;
  }
}
