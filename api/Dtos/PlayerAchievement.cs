using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using api.Entities;

namespace api.Dtos
{
    public class PlayerAchievementResponseDto
    {
        public Guid PlayerAchievementId { get; set; }
        public Guid? PlayerId { get; set; }
        public Player? Player { get; set; }
        public Guid? AchievementId { get; set; }
        public Achievement? Achievement { get; set; }
        public bool IsComplete { get; set; }
    }

    public class PlayerAchievementMarkCompleteDto
    {
        [Required]
        public bool IsComplete { get; set; } = false;
        [Required]
        public int Xp { get; set; } = 0;
    }

    public class PlayerAchievementCreateDto : PlayerAchievementManipulate
    {

    }

    public class PlayerAchievementUpdateDto : PlayerAchievementManipulate
    {

    }

    public class PlayerAchievementManipulate
    {
        [Required]
        public Guid? PlayerId { get; set; }
        [Required]
        public Guid? AchievementId { get; set; }
        public bool IsComplete { get; set; } = false;
    }
}
