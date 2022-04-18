using BLL.Features.CategoryFeature.Commands;
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
        [HttpPost("Create")]
        public async Task<IActionResult> Create(CreateCategoryCommand request)
        {
            return Created(nameof(Create), await _mediator.Send(request));
        }
    }
}
