using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("Achievement")]
    [Index(nameof(Page), IsUnique = true)]
    [Index(nameof(Name), IsUnique = true)]
    public class Achievement
    {
        [Key]
        public Guid AchievementId { get; set; }
        [Required, MaxLength(100)]
        public string? Name { get; set; }
        public int Page { get; set; } = 1;
        public int Xp { get; set; } = 1;

        // Foreign keys
        [ForeignKey("PartId")]
        public Guid PartId { get; set; }
        public Part? Part { get; set; }
    }
}
