using api.Dtos;
using api.Entities;
using api.Exceptions;
using api.Repository;
using AutoMapper;

namespace api.Services
{
    public class AchievementService : IAchievementService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public AchievementService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public AchievementResponseDto Create(AchievementCreateDto dto)
        {
            var entity = _mapper.Map<Achievement>(dto);
            _repositoryManager.AchievementRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<AchievementResponseDto>(entity);
        }

        public void Delete(Guid achievementId)
        {
            var entity = FindAchievementIfExists(achievementId, true);
            _repositoryManager.AchievementRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private Achievement FindAchievementIfExists(Guid achievementId, bool trackChanges)
        {
            var entity = _repositoryManager.AchievementRepository.FindByCondition(
                x => x.AchievementId == achievementId,
                trackChanges)
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No achievement found with id " + achievementId);

            return entity;
        }

        public IEnumerable<AchievementResponseDto> FindByPartId(Guid partId)
        {
            var entities = _repositoryManager.AchievementRepository.FindByCondition(
                x => x.PartId == partId,
                false)
                .OrderBy(x => x.Page);
            var dtos = _mapper.Map<IEnumerable<AchievementResponseDto>>(entities);
            return dtos;
        }

        public AchievementResponseDto Get(Guid achievementId)
        {
            var entity = FindAchievementIfExists(achievementId, false);
            var dto = _mapper.Map<AchievementResponseDto>(entity);
            return dto;
        }

        public void Update(Guid achievementId, AchievementUpdateDto dto)
        {
            var entity = FindAchievementIfExists(achievementId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
        }
    }
}
