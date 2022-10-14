using api.Dtos;
using api.Entities;
using api.Exceptions;
using api.Repository;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

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

        private Player FindPlayerIfExists(Guid? playerId, bool trackChanges)
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

        public void UpdateAchievements(Guid playerId)
        {
            RemovePreviouslyDeletedAchievements(playerId);
            AddNewlyAddedAchievements(playerId);
        }

        private void AddNewlyAddedAchievements(Guid playerId)
        {
            var playerAchievements = _repositoryManager.PlayerAchievementRepository.FindByCondition(
                x => x.PlayerId == playerId,
                false)
                .Select(x => x.AchievementId)
                .ToList();
            var achievements = _repositoryManager.AchievementRepository.FindByCondition(
                x => playerAchievements.Contains(x.AchievementId) == false,
                true);

            foreach(Achievement achievement in achievements)
            {
                _repositoryManager.PlayerAchievementRepository.Create(
                    new PlayerAchievement
                    {
                        AchievementId = achievement.AchievementId,
                        PlayerId = playerId,
                        IsComplete = false
                    });
            }

            _repositoryManager.Save();
        }

        private void RemovePreviouslyDeletedAchievements(Guid playerId)
        {
            var achievements = _repositoryManager.AchievementRepository.FindAll(false)
                .Select(x => x.AchievementId)
                .ToList();
            var playerAchievements = _repositoryManager.PlayerAchievementRepository.FindByCondition(
                x => x.PlayerId == playerId &&
                achievements.Contains(x.AchievementId ?? Guid.Empty) == false,
                true);

            foreach (PlayerAchievement playerAchievement in playerAchievements)
            {
                _repositoryManager.PlayerAchievementRepository.Delete(playerAchievement);
            }

            _repositoryManager.Save();
        }

        public IEnumerable<PlayerAchievementResponseDto> GetAchievements(Guid playerId,
            Guid partId)
        {
            var entities = _repositoryManager.PlayerAchievementRepository.FindByCondition(
                x => x.PlayerId == playerId && x.Achievement.PartId == partId,
                false,
                include: i => i
                    .Include(x => x.Achievement))
                .OrderBy(x => x.Achievement.Page);
            var dtos = _mapper.Map<IEnumerable<PlayerAchievementResponseDto>>(entities);
            return dtos;
        }

        public bool CompleteAchievement(Guid playerAchievementId, PlayerAchievementMarkCompleteDto dto)
        {
            try
            {
                var achievementEntity = _repositoryManager.PlayerAchievementRepository.FindByCondition(
                    x => x.PlayerAchievementId == playerAchievementId,
                    true)
                    .FirstOrDefault();
                if (achievementEntity == null) throw new NotFoundException("No achievement found with id " + playerAchievementId);

                achievementEntity.IsComplete = dto.IsComplete;

                var player = FindPlayerIfExists(achievementEntity.PlayerId, true);
                player.Experience = dto.IsComplete 
                    ? player.Experience + dto.Xp 
                    : player.Experience - dto.Xp;
                if (player.Experience <= 0) player.Experience = 0;
                _repositoryManager.Save();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
