using api.Dtos;
using api.Entities;
using api.Exceptions;
using api.Repository;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class PartService : IPartService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public PartService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public PartResponseDto Create(PartCreateDto dto)
        {
            var entity = _mapper.Map<Part>(dto);
            _repositoryManager.PartRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<PartResponseDto>(entity);
        }

        public void Delete(Guid partId)
        {
            var entity = FindPartIfExists(partId, true);
            _repositoryManager.PartRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private Part FindPartIfExists(Guid partId, bool trackChanges)
        {
            var entity = _repositoryManager.PartRepository.FindByCondition(
                x => x.PartId == partId,
                trackChanges)
                .FirstOrDefault();

            if (entity == null) throw new NotFoundException("No part found with id " + partId);

            return entity;
        }

        public PartResponseDto Get(Guid partId)
        {
            var entity = FindPartIfExists(partId, false);
            var dto = _mapper.Map<PartResponseDto>(entity);
            dto.AchievementCount = _repositoryManager.AchievementRepository.FindByCondition(
                x => x.PartId == partId,
                false)
                .Count();
            return dto;
        }

        public IEnumerable<PartResponseDto> GetAll()
        {
            var entities = _repositoryManager.PartRepository
                .FindAll(false)
                .Include(i => i.Achievements)
                .Select(x => new PartResponseDto
                {
                    PartId = x.PartId,
                    Achievements = x.Achievements,
                    Name = x.Name,
                    SortOrder = x.SortOrder,
                    AchievementCount = x.Achievements == null ? 0 : x.Achievements.Count()
                })
                .OrderBy(x => x.SortOrder);
            return entities;
        }

        public void Update(Guid partId, PartUpdateDto dto)
        {
            var entity = FindPartIfExists(partId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
        }
    }
}
