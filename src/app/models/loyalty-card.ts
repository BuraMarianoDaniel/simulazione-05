export interface LoyaltyCardResponse {
  id: number;
  holder: string;
  points: number;
}

export interface LoyaltyCardCreateRequest {
  name: string;
  surname: string;
}
