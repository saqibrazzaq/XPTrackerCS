using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("PlayerAchievement")]
    [Index(nameof(PlayerAchievementId), nameof(AchievementId), IsUnique = true)]
    public class PlayerAchievement
    {
        [Key]
        public Guid PlayerAchievementId { get; set; }
        [Required, ForeignKey("AchievementId")]
        public Guid? AchievementId { get; set; }
        public Achievement? Achievement { get; set; }
        public bool IsComplete { get; set; } = false;
    }
}
