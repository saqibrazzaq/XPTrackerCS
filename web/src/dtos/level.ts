export interface LevelResponseDto {
  levelId?: string;
  name?: string;
  minExp?: number;
  maxExp?: number;
}

export class LevelUpdateDto {
  name?: string = "";
  minExp?: number = 0;
  maxExp?: number = 0;
}