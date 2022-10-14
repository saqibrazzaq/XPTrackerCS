using api.Data;

namespace api.Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly AppDbContext _context;

        private readonly Lazy<IPartRepository> _partRepository;
        private readonly Lazy<IAchievementRepository> _achievementRepository;
        private readonly Lazy<IPlayerRepository> _playerRepository;
        private readonly Lazy<IPlayerAchievementRepository> _playerAchievementRepository;
        private readonly Lazy<ILevelRepository> _levelRepository;
        public RepositoryManager(AppDbContext context)
        {
            _context = context;

            _partRepository = new Lazy<IPartRepository>(() =>
                new PartRepository(context));
            _achievementRepository = new Lazy<IAchievementRepository>(() =>
                new AchievementRepository(context));
            _playerRepository = new Lazy<IPlayerRepository>(() => 
                new PlayerRepository(context));
            _playerAchievementRepository = new Lazy<IPlayerAchievementRepository>(() =>
                new PlayerAchievementRepository(context));
            _levelRepository = new Lazy<ILevelRepository>(() =>
                new LevelRepository(context));
        }

        public IPartRepository PartRepository => _partRepository.Value;

        public IAchievementRepository AchievementRepository => _achievementRepository.Value;

        public IPlayerRepository PlayerRepository => _playerRepository.Value;

        public IPlayerAchievementRepository PlayerAchievementRepository => _playerAchievementRepository.Value;

        public ILevelRepository LevelRepository => _levelRepository.Value;

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
