export interface PartResponseDto {
  partId?: string;
  name?: string;
  sortOrder?: number;
  achievementCount?: number;
}

export class PartUpdateDto {
  name?: string = "";
  sortOrder?: number = 10;
}