using api.Dtos;

namespace api.Services
{
    public interface IPlayerService
    {
        PlayerResponseDto Create(PlayerCreateDto dto);
        void Update(Guid playerId, PlayerUpdateDto dto);
        void Delete(Guid playerId);
        PlayerResponseDto Get(Guid playerId);
        IEnumerable<PlayerResponseDto> GetAll();
    }
}
