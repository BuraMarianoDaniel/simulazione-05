import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToastComponent} from "../components/toast/toast.component";
import {ToasterComponent} from "../components/toaster/toaster.component";
import {LayoutComponent} from "../components/layout/layout.component";
import {NavbarComponent} from "../components/layout/navbar/navbar.component";
import {BreadcrumbComponent} from "../components/layout/breadcrumb/breadcrumb.component";
import {FooterComponent} from "../components/layout/footer/footer.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormControlComponent} from "../components/form-control/form-control.component";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SwipeModule} from "ng-swipe";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    // components
    ToastComponent,
    ToasterComponent,
    LayoutComponent,
    NavbarComponent,
    BreadcrumbComponent,
    FooterComponent,
    FormControlComponent
  ],
  imports: [
    //modules
    FontAwesomeModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SwipeModule,
    HttpClientModule
  ],
  exports: [
    // components
    ToastComponent,
    ToasterComponent,
    LayoutComponent,
    NavbarComponent,
    BreadcrumbComponent,
    FooterComponent,
    FormControlComponent,

    //module
    FontAwesomeModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(far, fas);
  }
}
