using api.Data;
using api.Entities;

namespace api.Repository
{
    public class AchievementRepository : RepositoryBase<Achievement>, IAchievementRepository
    {
        public AchievementRepository(AppDbContext context) : base(context)
        {
        }
    }
}
