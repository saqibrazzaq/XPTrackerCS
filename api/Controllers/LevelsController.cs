using api.ActionFilters;
using api.Dtos;
using api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LevelsController : ControllerBase
    {
        private readonly ILevelService _levelService;

        public LevelsController(ILevelService levelService)
        {
            _levelService = levelService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var res = _levelService.GetAll();
            return Ok(res);
        }

        [HttpGet("{levelId}")]
        public IActionResult Get(Guid levelId)
        {
            var res = _levelService.Get(levelId);
            return Ok(res);
        }

        [HttpGet("experience/{experience}")]
        public IActionResult FindByExperience(int experience)
        {
            var res = _levelService.FindByExperience(experience);
            return Ok(res);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Create(LevelCreateDto dto)
        {
            var res = _levelService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{levelId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Update(Guid levelId, LevelUpdateDto dto)
        {
            _levelService.Update(levelId, dto);
            return NoContent();
        }

        [HttpDelete("{levelId}")]
        public IActionResult Delete(Guid levelId)
        {
            _levelService.Delete(levelId);
            return NoContent();
        }

        [HttpPost("reset")]
        public IActionResult Reset()
        {
            _levelService.Reset();
            return NoContent();
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var res = _levelService.Count();
            return Ok(res);
        }
    }
}
