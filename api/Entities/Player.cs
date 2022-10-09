using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("Player")]
    [Index(nameof(Name), IsUnique = true)]
    public class Player
    {
        [Key]
        public Guid PlayerId { get; set; }
        [Required, MaxLength(100)]
        public string? Name { get; set; } = "Player 1";
        public int Experience { get; set; } = 0;
    }
}
