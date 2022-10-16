using api.Dtos;

namespace api.Services
{
    public interface ILevelService
    {
        LevelResponseDto Create(LevelCreateDto dto);
        void Update(Guid levelId, LevelUpdateDto dto);
        void Delete(Guid levelId);
        IEnumerable<LevelResponseDto> GetAll();
        LevelResponseDto Get(Guid levelId);
        LevelResponseDto FindByExperience(int exp);
    }
}
