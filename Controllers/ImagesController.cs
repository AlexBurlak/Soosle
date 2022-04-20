using BLL.Features.ImageFeature.Commands;
using BLL.Features.ImageFeature.Queries;
using BLL.Features.UserFeature.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Soosle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ImagesController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;
        public ImagesController(IMediator mediator, IConfiguration configuration)
        {
            _mediator = mediator;
            _configuration = configuration;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateImageCommand request)
        {
            request.AuthorId = await _mediator.Send(new GetUserIdByUserNameQuery { UserName = User.Identity.Name });
            request.FolderPath = Path.Combine(Environment.CurrentDirectory, _configuration["ImageFolder"]);
            var id = await _mediator.Send(request);
            return Ok(id);
        }

        [HttpGet("search-images")]
        public async Task<IActionResult> SearchImages(GetImageByParamsQuery request)
        {
            return Ok(await _mediator.Send(request));
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(DeleteImageCommand request)
        {
            await _mediator.Send(request);
            return NoContent();
        }

        [HttpPut("approve")]
        public async Task<IActionResult> Approve(ApproveImageCommand request)
        {
            return Ok(await _mediator.Send(request));
        }
    }
}
