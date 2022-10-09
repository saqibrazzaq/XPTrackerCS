using api.Data;
using api.Entities;

namespace api.Repository
{
    public class PlayerAchievementRepository : RepositoryBase<PlayerAchievement>, IPlayerAchievementRepository
    {
        public PlayerAchievementRepository(AppDbContext context) : base(context)
        {
        }
    }
}
