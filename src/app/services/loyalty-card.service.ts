import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {LoyaltyCardCreateRequest, LoyaltyCardResponse} from "../models/loyalty-card";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoyaltyCardService {
  private baseUrl: string = `${environment.apiUrl}/loyalty-card`

  constructor(
    private http: HttpClient
  ) { }

  public index(size: number = 20): Observable<LoyaltyCardResponse[]> {
    return this.http.get<LoyaltyCardResponse[]>(`${this.baseUrl}?size=${size}`).pipe(map(r => r));
  }

  public details(loyaltyCardId: number): Observable<LoyaltyCardResponse> {
    return this.http.get<LoyaltyCardResponse>(`${this.baseUrl}/${loyaltyCardId}`).pipe(map(r => r));
  }

  public create(body: LoyaltyCardCreateRequest): Observable<LoyaltyCardResponse> {
    return this.http.post<LoyaltyCardResponse>(`${this.baseUrl}`, body).pipe(map(r => r));
  }
}
