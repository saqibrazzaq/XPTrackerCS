using api.ActionFilters;
using api.Dtos;
using api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly IPlayerService _playerService;

        public PlayersController(IPlayerService playerService)
        {
            _playerService = playerService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var res = _playerService.GetAll();
            return Ok(res);
        }

        [HttpGet("{playerId}")]
        public IActionResult Get(Guid playerId)
        {
            var res = _playerService.Get(playerId);
            return Ok(res);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Create(PlayerCreateDto dto)
        {
            var res = _playerService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{playerId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Update(Guid playerId, PlayerUpdateDto dto)
        {
            _playerService.Update(playerId, dto);
            return NoContent();
        }

        [HttpDelete("{playerId}")]
        public IActionResult Delete(Guid playerId)
        {
            _playerService.Delete(playerId);
            return NoContent();
        }

        [HttpPost("update-achievements/{playerId}")]
        public IActionResult UpdateAchievements(Guid playerId)
        {
            _playerService.UpdateAchievements(playerId);
            return NoContent();
        }

        [HttpGet("achievements/{playerId}/{partId}")]
        public IActionResult GetAchievements(Guid playerId, Guid partId)
        {
            _playerService.UpdateAchievements(playerId);
            var res = _playerService.GetAchievements(playerId, partId);
            return Ok(res);
        }

        [HttpGet("complete-achievement/{playerAchievementId}/{isComplete}")]
        public IActionResult CompleteAchievement(Guid playerAchievementId, bool isComplete)
        {
            var res = _playerService.CompleteAchievement(playerAchievementId, isComplete);
            return Ok(res);
        }
    }
}
