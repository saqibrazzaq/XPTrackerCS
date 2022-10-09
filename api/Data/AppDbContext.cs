using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {

        }

        // Tables
        public DbSet<Part>? Parts { get; set; }
        public DbSet<Achievement>? Achievements { get; set; }
        public DbSet<Player>? Players { get; set; }
        public DbSet<PlayerAchievement>? PlayerAchievements { get; set; }
    }
}
