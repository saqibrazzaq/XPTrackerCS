using api.Dtos;
using api.Entities;
using api.Exceptions;
using api.Repository;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace api.Services
{
    public class AchievementService : IAchievementService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        IWebHostEnvironment _webHostEnvironment;
        public AchievementService(IRepositoryManager repositoryManager,
            IMapper mapper,
            IWebHostEnvironment webHostEnvironment)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
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
                trackChanges,
                include: i => i.Include(x => x.Part))
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

        public void Reset()
        {
            DeletePlayerAchievements();
            _repositoryManager.Save();

            DeleteParts();
            _repositoryManager.Save();

            ImportParts();
            _repositoryManager.Save();

        }

        private void DeletePlayerAchievements()
        {
            var playerAchievements = _repositoryManager.PlayerAchievementRepository.
                FindAll(true);
            if (playerAchievements != null && playerAchievements.Count() > 0)
            {
                foreach(var playerAchievement in playerAchievements)
                {
                    _repositoryManager.PlayerAchievementRepository.Delete(playerAchievement);
                }
            }
        }

        private void DeleteParts()
        {
            var parts = _repositoryManager.PartRepository.FindAll(true);
            if (parts != null && parts.Count() > 0)
            {
                foreach (var part in parts)
                {
                    _repositoryManager.PartRepository.Delete(part);
                }
            }
                
        }

        private void ImportParts()
        {
            var parts = ReadPartsFromJson();
            if (parts != null && parts.Count() > 0)
            {
                foreach (var part in parts)
                {
                    _repositoryManager.PartRepository.Create(part);
                }
            }
        }

        private IEnumerable<Part>? ReadPartsFromJson()
        {
            var rootPath = _webHostEnvironment.WebRootPath;
            var jsonFilePath = Path.Combine(rootPath, "data", "achievements.json");
            var jsonData = File.ReadAllText(jsonFilePath);
            var parts = JsonSerializer.Deserialize<IEnumerable<Part>>(jsonData);
            return parts;
        }

        public int Count()
        {
            var count = _repositoryManager.AchievementRepository.FindAll(false)
                .Count();
            return count;
        }
    }
}
