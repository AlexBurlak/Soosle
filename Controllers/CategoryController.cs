using BLL.Features.CategoryFeature.Commands;
using BLL.Features.CategoryFeature.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Soosle.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CategoryController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateCategoryCommand request)
        {
            return Created(nameof(Create), await _mediator.Send(request));
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _mediator.Send(new GetAllCategoriesQuery()));
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update(UpdateCategoryCommand request)
        {
            return Ok(await _mediator.Send(request));
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(DeleteCategoryCommand request)
        {
            await _mediator.Send(request);
            return NoContent();
        }
    }
}
