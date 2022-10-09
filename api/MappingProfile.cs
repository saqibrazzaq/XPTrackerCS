using api.Dtos;
using api.Entities;
using AutoMapper;

namespace api
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Part
            CreateMap<PartCreateDto, Part>();
            CreateMap<PartUpdateDto, Part>();
            CreateMap<Part, PartResponseDto>();

            // Achievement
            CreateMap<AchievementCreateDto, Achievement>();
            CreateMap<AchievementUpdateDto, Achievement>();
            CreateMap<Achievement, AchievementResponseDto>();

            // Player
            CreateMap<PlayerCreateDto, Player>();
            CreateMap<PlayerUpdateDto, Player>();
            CreateMap<Player, PlayerResponseDto>();

            // PlayerAchievement
            CreateMap<PlayerAchievementCreateDto, PlayerAchievement>();
            CreateMap<PlayerAchievementUpdateDto, PlayerAchievement>();
            CreateMap<PlayerAchievement, PlayerAchievementResponseDto>();
        }
    }
}
