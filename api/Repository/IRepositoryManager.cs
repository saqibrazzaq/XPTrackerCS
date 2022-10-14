namespace api.Repository
{
    public interface IRepositoryManager
    {
        IPartRepository PartRepository { get; }
        IAchievementRepository AchievementRepository { get; }
        IPlayerRepository PlayerRepository { get; }
        IPlayerAchievementRepository PlayerAchievementRepository { get; }
        ILevelRepository LevelRepository { get; }
        void Save();
    }
}
