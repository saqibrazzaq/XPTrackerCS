using api.ActionFilters;
using api.Dtos;
using api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartsController : ControllerBase
    {
        private readonly IPartService _partService;

        public PartsController(IPartService partService)
        {
            _partService = partService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var res = _partService.GetAll();
            return Ok(res);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Create(PartCreateDto dto)
        {
            var res = _partService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{partId}")]
        [ServiceFilter(typeof (ValidationFilterAttribute))]
        public IActionResult Update(Guid partId, PartUpdateDto dto)
        {
            _partService.Update(partId, dto);
            return NoContent();
        }

        [HttpDelete("{partId}")]
        public IActionResult Delete(Guid partId)
        {
            _partService.Delete(partId);
            return NoContent();
        }
    }
}
