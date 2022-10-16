using api.Dtos;
using api.Entities;
using api.Exceptions;
using api.Repository;
using AutoMapper;

namespace api.Services
{
    public class LevelService : ILevelService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public LevelService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public LevelResponseDto Create(LevelCreateDto dto)
        {
            var entity = _mapper.Map<Level>(dto);
            _repositoryManager.LevelRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<LevelResponseDto>(entity);
        }

        public void Delete(Guid levelId)
        {
            var entity = FindLevelIfExists(levelId, true);
            _repositoryManager.LevelRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private Level FindLevelIfExists(Guid levelId, bool trackChanges)
        {
            var entity = _repositoryManager.LevelRepository.FindByCondition(
                x => x.LevelId == levelId,
                trackChanges)
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No level found with id " + levelId);
            return entity;
        }

        public LevelResponseDto Get(Guid levelId)
        {
            var entity = FindLevelIfExists(levelId, false);
            return _mapper.Map<LevelResponseDto>(entity);
        }

        public IEnumerable<LevelResponseDto> GetAll()
        {
            var entities = _repositoryManager.LevelRepository.FindAll(false)
                .OrderBy(x => x.MinExp);
            return _mapper.Map<IEnumerable<LevelResponseDto>>(entities);
        }

        public void Update(Guid levelId, LevelUpdateDto dto)
        {
            var entity = FindLevelIfExists(levelId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
        }

        public LevelResponseDto FindByExperience(int exp)
        {
            var entity = _repositoryManager.LevelRepository.FindByCondition(
                x => exp >= x.MinExp && exp <= x.MaxExp,
                false)
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No level found");
            return _mapper.Map<LevelResponseDto>(entity);
        }
    }
}
