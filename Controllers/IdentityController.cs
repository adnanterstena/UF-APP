using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NerdyCTask.Models;
using NerdyCTask.ViewModels;

namespace NerdyCTask.Controllers
{
    [Route("api/identity/")]
    [ApiController]
    [AllowAnonymous]
    public class IdentityController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        SignInManager<ApplicationUser> _signInManager;


        public IdentityController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [Route("Register")]
        [HttpPost]
        public async Task<object> RegisterAsync([FromBody] RegisterAdm data)
        {
            if (data.UserName != "" && data.Email != "" && data.Password != "")
            { 
                    ApplicationUser user = new ApplicationUser()
                    {
                        UserName = data.UserName,
                        Email = data.Email,
                        FirstName = data.FirstName,
                        LastName = data.LastName
                    };
                    var result = await _userManager.CreateAsync(user, data.Password);

                    if (result.Succeeded)
                    {                      
                        return Ok();
                    }
                    else
                    {
                        return StatusCode(403, result.Errors);
                    }
                
            }
            List<IdentityError> err = new List<IdentityError>();
            err.Add(new IdentityError()
            {
                Code = "tryAgain",
                Description = "Please enter 'User Name', 'Email' and 'Passwords' (passwords must be at least 8 characters).",
            });
            return StatusCode(403, err);
        }

        [Route("LogIn")]
        [HttpPost]
        public async Task<object> login([FromBody] UserLogin userL)
        {
            ApplicationUser user;

            if (userL.UserName.Contains("@"))
                user = await _userManager.FindByEmailAsync(userL.UserName);
            else
                user = await _userManager.FindByNameAsync(userL.UserName);

            if (user != null)
            {
                var signInResult = await _signInManager.PasswordSignInAsync(user, userL.Password, true, false);
                if (signInResult.Succeeded)
                {
                    return Ok();
                }
            }
            return BadRequest();
        }

        [Route("LogOut")]
        public async Task logout()
        {
            await _signInManager.SignOutAsync();
        }

    }
}
