using api.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Dtos
{
    public class AchievementResponseDto
    {
        public Guid AchievementId { get; set; }
        public string? Name { get; set; }
        public int Page { get; set; } = 1;
        public int Xp { get; set; } = 1;
        public Guid? PartId { get; set; }
        public Part? Part { get; set; }
    }

    public class AchievementCreateDto : AchievementManipulate
    {

    }

    public class AchievementUpdateDto : AchievementManipulate
    {

    }

    public class AchievementManipulate
    {
        [Required, MaxLength(100)]
        public string? Name { get; set; }
        public int Page { get; set; } = 1;
        public int Xp { get; set; } = 1;
        [Required]
        public Guid? PartId { get; set; }
    }
}
