using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("Part")]
    [Index(nameof(Name), IsUnique = true)]
    public class Part
    {
        [Key]
        public Guid PartId { get; set; }
        [Required, MaxLength(50)]
        public string? Name { get; set; }
        public int SortOrder { get; set; } = 10;

        // Child tables
        public IEnumerable<Achievement>? Achievements { get; set; }
    }
}
