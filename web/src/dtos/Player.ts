export interface PlayerResponseDto {
  playerId?: string;
  name?: string;
  experience?: number;
}

export class PlayerUpdateDto {
  name?: string = "";
}