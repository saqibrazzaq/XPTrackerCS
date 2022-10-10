using api.Dtos;

namespace api.Services
{
    public interface IPartService
    {
        PartResponseDto Create(PartCreateDto dto);
        void Update(Guid partId, PartUpdateDto dto);
        void Delete(Guid partId);
        IEnumerable<PartResponseDto> GetAll();
        PartResponseDto Get(Guid partId);
    }
}
