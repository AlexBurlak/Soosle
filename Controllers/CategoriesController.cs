using BLL.Features.CategoryFeature.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Soosle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CategoriesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateCategoryCommand request)
        {
            return Created(nameof(Create), await _mediator.Send(request));
        }
    }
}
