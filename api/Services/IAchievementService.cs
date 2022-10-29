using api.Dtos;
using api.Entities;

namespace api.Services
{
    public interface IAchievementService
    {
        AchievementResponseDto Create(AchievementCreateDto dto);
        void Update(Guid achievementId, AchievementUpdateDto dto);
        void Delete(Guid achievementId);
        AchievementResponseDto Get(Guid achievementId);
        IEnumerable<AchievementResponseDto> FindByPartId(Guid partId);
        void Reset();
        int Count();
    }
}
