using api.Data;
using api.Entities;

namespace api.Repository
{
    public class LevelRepository : RepositoryBase<Level>, ILevelRepository
    {
        public LevelRepository(AppDbContext context) : base(context)
        {
        }
    }
}
