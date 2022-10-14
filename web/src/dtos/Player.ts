import { AchievementResponseDto } from "./achievement";

export interface PlayerResponseDto {
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

export interface PlayerAchievementMarkCompleteDto {
  playerAchievementId?: string;
  isComplete?: boolean;
}