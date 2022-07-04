import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MovementRechargeRequest, MovementResponse} from "../models/movement";

@Injectable({
  providedIn: 'root'
})
export class MovementService {
  private baseUrl: string = `${environment.apiUrl}/movement`

  constructor(
    private http: HttpClient
  ) { }

  public filter(loyaltyCardId: number, minDate: string, maxDate: string, size: number = 20): Observable<MovementResponse[]> {
    return this.http.get<MovementResponse[]>(`${this.baseUrl}/filter/${loyaltyCardId}?size=${size}&min=${minDate}&max=${maxDate}`).pipe(map(r => r));
  }

  public createRecharge(loyaltyCardId: number, body: MovementRechargeRequest): Observable<MovementResponse> {
    return this.http.post<MovementResponse>(`${this.baseUrl}/recharge/${loyaltyCardId}`, body).pipe(map(r => r));
  }

  public createRedeem(loyaltyCardId: number, prizeId: number): Observable<MovementResponse> {
    return this.http.post<MovementResponse>(`${this.baseUrl}/redeem/${loyaltyCardId}/${prizeId}`, null).pipe(map(r => r));
  }
}
