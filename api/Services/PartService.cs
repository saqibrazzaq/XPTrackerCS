using api.Dtos;
using api.Entities;
using api.Exceptions;
using api.Repository;
using AutoMapper;

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
            return _mapper.Map<PartResponseDto>(entity);
        }

        public IEnumerable<PartResponseDto> GetAll()
        {
            var entities = _repositoryManager.PartRepository.FindAll(false)
                .OrderBy(x => x.SortOrder);
            return _mapper.Map<IEnumerable<PartResponseDto>>(entities);
        }

        public void Update(Guid partId, PartUpdateDto dto)
        {
            var entity = FindPartIfExists(partId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
        }
    }
}
