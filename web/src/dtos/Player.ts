import { AchievementResponseDto } from "./achievement";

export class PlayerResponseDto {
  playerId?: string;
  name?: string;
  experience?: number;
}

export class PlayerUpdateDto {
  name?: string = "";
}

export interface PlayerAchievementResponseDto {
  playerAchievementId?: string;
  playerId?: string;
  achievementId?: string;
  achievement?: AchievementResponseDto;
  isComplete?: boolean;
}

export class PlayerAchievementMarkCompleteDto {
  constructor(isComplete?: boolean, xp?: number) {
    this.isComplete = isComplete;
    this.xp = xp;
  }
  
  isComplete?: boolean;
  xp?: number;
}