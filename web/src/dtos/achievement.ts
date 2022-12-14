import { PartResponseDto } from "./part";
import { PlayerAchievementResponseDto } from "./Player";

export interface AchievementResponseDto {
  achievementId?: string;
  name?: string;
  page?: number;
  xp?: number;
  partId?: string;
  part?: PartResponseDto;
  playerAchievements?: PlayerAchievementResponseDto[];
}

export class AchievementUpdateDto {
  constructor(partId?: string) {
    this.partId = partId;
  }
  name?: string = "";
  page?: number = 1;
  xp?: number = 25;
  partId?: string = "";
}

