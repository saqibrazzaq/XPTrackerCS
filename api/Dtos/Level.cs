using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
    public class LevelResponseDto
    {
        public Guid LevelId { get; set; }
        public string? Name { get; set; }
        public int MinExp { get; set; } = 0;
        public int MaxExp { get; set; } = 0;
    }

    public class LevelCreateDto : LevelManipulate
    {

    }

    public class LevelUpdateDto : LevelManipulate
    {

    }

    public class LevelManipulate
    {
        [Required, MaxLength(8)]
        public string? Name { get; set; }
        public int MinExp { get; set; } = 0;
        public int MaxExp { get; set; } = 0;
    }
}
