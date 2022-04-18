using BLL.Features.UserFeature.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Soosle.ViewModels.Account;
using System.IdentityModel.Tokens.Jwt;

namespace Soosle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;
        public AccountController(IMediator mediator, IConfiguration configuration)
        {
            _mediator = mediator;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(CreateUserCommand userCommand)
        {
            var id = await _mediator.Send(userCommand);
            return Created(nameof(Register), null);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var loginCommand = new UserLogInCommand() {
                Login = request.Login,
                Password = request.Password,
                Secret = _configuration["JWT:Secret"]
            };
            var token = await _mediator.Send(loginCommand);
            if (token is null)
            {
                return Unauthorized();
            }
            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
            });
        }
    }
}
