using api.Dtos;
using api.Entities;
using api.Exceptions;
using api.Repository;
using AutoMapper;

namespace api.Services
{
    public class PlayerService : IPlayerService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public PlayerService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public PlayerResponseDto Create(PlayerCreateDto dto)
        {
            var entity = _mapper.Map<Player>(dto);
            _repositoryManager.PlayerRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<PlayerResponseDto>(entity);
        }

        public void Delete(Guid playerId)
        {
            var entity = FindPlayerIfExists(playerId, true);
            _repositoryManager.PlayerRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private Player FindPlayerIfExists(Guid playerId, bool trackChanges)
        {
            var entity = _repositoryManager.PlayerRepository.FindByCondition(
                x => x.PlayerId == playerId,
                trackChanges)
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No player found with id " + playerId);

            return entity;
        }

        public PlayerResponseDto Get(Guid playerId)
        {
            var entity = FindPlayerIfExists(playerId, false);
            var dto = _mapper.Map<PlayerResponseDto>(entity);
            return dto;
        }

        public IEnumerable<PlayerResponseDto> GetAll()
        {
            var entities = _repositoryManager.PlayerRepository.FindAll(false)
                .OrderBy(x => x.Name);
            var dtos = _mapper.Map<IEnumerable<PlayerResponseDto>>(entities);
            return dtos;
        }

        public void Update(Guid playerId, PlayerUpdateDto dto)
        {
            var entity = FindPlayerIfExists(playerId, false);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
        }
    }
}
