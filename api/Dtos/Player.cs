using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
    public class PlayerResponseDto
    {
        public Guid PlayerId { get; set; }
        public string? Name { get; set; }
        public int Experience { get; set; } = 0;
    }

    public class PlayerCreateDto : PlayerManipulate
    {

    }

    public class PlayerUpdateDto : PlayerManipulate
    {

    }

    public class PlayerManipulate
    {
        [Required, MaxLength(100)]
        public string? Name { get; set; } = "Player 1";
    }
}
