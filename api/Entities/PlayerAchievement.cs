using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("PlayerAchievement")]
    [Index(nameof(PlayerId), nameof(AchievementId), IsUnique = true)]
    public class PlayerAchievement
    {
        [Key]
        public Guid PlayerAchievementId { get; set; }
        [Required, ForeignKey("PlayerId")]
        public Guid? PlayerId { get; set; }
        public Player? Player { get; set; }
        [Required, ForeignKey("AchievementId")]
        public Guid? AchievementId { get; set; }
        public Achievement? Achievement { get; set; }
        public bool IsComplete { get; set; } = false;
    }
}
