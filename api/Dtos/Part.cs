using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
    public class PartResponseDto
    {
        public Guid PartId { get; set; }
        public string? Name { get; set; }
        public int SortOrder { get; set; } = 10;
        public ICollection<AchievementResponseDto>? Achievements { get; set; }
        public int AchievementCount { get; set; } = 0;
    }

    public class PartCreateDto : PartManipulate
    {

    }

    public class PartUpdateDto : PartManipulate
    {

    }

    public class PartManipulate
    {
        [Required, MaxLength(50)]
        public string? Name { get; set; }
        public int SortOrder { get; set; } = 10;
    }
}
