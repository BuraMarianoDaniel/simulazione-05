import {PrizeResponse} from "./prize";

export interface MovementResponse {
  id: number;
  movementDate: string;
  type: number;
  points: number;
  prize: PrizeResponse;
}

export interface MovementRechargeRequest {
  points: number;
}
