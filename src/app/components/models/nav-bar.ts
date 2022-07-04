import {IconProp} from "@fortawesome/fontawesome-svg-core";

export interface BreadCrumb {
  title: string;
  route: string;
  icon?: IconProp;
}
export interface NavBar {
  title: string;
  route: string;
  refName: string;
}
