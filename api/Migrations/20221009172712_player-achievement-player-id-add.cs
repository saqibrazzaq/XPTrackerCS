using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class playerachievementplayeridadd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PlayerAchievement_PlayerAchievementId_AchievementId",
                table: "PlayerAchievement");

            migrationBuilder.AddColumn<Guid>(
                name: "PlayerId",
                table: "PlayerAchievement",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_PlayerAchievement_PlayerId_AchievementId",
                table: "PlayerAchievement",
                columns: new[] { "PlayerId", "AchievementId" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerAchievement_Player_PlayerId",
                table: "PlayerAchievement",
                column: "PlayerId",
                principalTable: "Player",
                principalColumn: "PlayerId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlayerAchievement_Player_PlayerId",
                table: "PlayerAchievement");

            migrationBuilder.DropIndex(
                name: "IX_PlayerAchievement_PlayerId_AchievementId",
                table: "PlayerAchievement");

            migrationBuilder.DropColumn(
                name: "PlayerId",
                table: "PlayerAchievement");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerAchievement_PlayerAchievementId_AchievementId",
                table: "PlayerAchievement",
                columns: new[] { "PlayerAchievementId", "AchievementId" },
                unique: true);
        }
    }
}
