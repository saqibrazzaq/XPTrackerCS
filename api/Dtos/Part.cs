﻿using api.Entities;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
    public class PartResponseDto
    {
        public Guid PartId { get; set; }
        public string? Name { get; set; }
        public int SortOrder { get; set; } = 10;
        public IEnumerable<Achievement>? Achievements { get; set; }
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