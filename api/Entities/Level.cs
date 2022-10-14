using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("Level")]
    public class Level
    {
        [Key]
        public Guid LevelId { get; set; }
        [Required, MaxLength(8)]
        public string? Name { get; set; }
        public int MinExp { get; set; } = 0;
        public int MaxExp { get; set; } = 0;
    }
}
