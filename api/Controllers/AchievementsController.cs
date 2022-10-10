using api.ActionFilters;
using api.Dtos;
using api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AchievementsController : ControllerBase
    {
        private readonly IAchievementService _achievementService;

        public AchievementsController(IAchievementService achievementService)
        {
            _achievementService = achievementService;
        }

        [HttpGet("list/{partId}")]
        public IActionResult FindByPartId(Guid partId)
        {
            var res = _achievementService.FindByPartId(partId);
            return Ok(res);
        }

        [HttpGet("{achievementId}")]
        public IActionResult Get(Guid achievementId)
        {
            var res = _achievementService.Get(achievementId);
            return Ok(res);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Create(AchievementCreateDto dto)
        {
            var res = _achievementService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{achievementId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Update(Guid achievementId, AchievementUpdateDto dto)
        {
            _achievementService.Update(achievementId, dto);
            return NoContent();
        }

        [HttpDelete("{achievementId}")]
        public IActionResult Delete(Guid achievementId)
        {
            _achievementService.Delete(achievementId);
            return NoContent();
        }
    }
}
