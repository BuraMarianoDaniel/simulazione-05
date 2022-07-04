import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {LoyaltyCardCreateRequest, LoyaltyCardResponse} from "../models/loyalty-card";
import {HttpClient} from "@angular/common/http";
import {MovementRechargeRequest, MovementResponse} from "../models/movement";
import {PrizeResponse} from "../models/prize";

@Injectable({
  providedIn: 'root'
})
export class PrizeService {
  private baseUrl: string = `${environment.apiUrl}/prize`

  constructor(
    private http: HttpClient
  ) { }

  public index(size: number = 1000): Observable<PrizeResponse[]> {
    return this.http.get<PrizeResponse[]>(`${this.baseUrl}?size=${size}`).pipe(map(r => r));
  }
}
