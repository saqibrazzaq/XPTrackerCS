using api.Data;
using api.Entities;

namespace api.Repository
{
    public class PartRepository : RepositoryBase<Part>, IPartRepository
    {
        public PartRepository(AppDbContext context) : base(context)
        {
        }
    }
}
