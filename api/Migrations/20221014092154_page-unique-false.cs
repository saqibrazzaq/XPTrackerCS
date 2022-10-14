using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class pageuniquefalse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Achievement_Page",
                table: "Achievement");

            migrationBuilder.CreateIndex(
                name: "IX_Achievement_Page",
                table: "Achievement",
                column: "Page");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Achievement_Page",
                table: "Achievement");

            migrationBuilder.CreateIndex(
                name: "IX_Achievement_Page",
                table: "Achievement",
                column: "Page",
                unique: true);
        }
    }
}
