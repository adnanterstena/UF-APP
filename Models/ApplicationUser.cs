using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NerdyCTask.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser() : base() { }

        
        [MaxLength(100)]
        public string FirstName { get; set; }
        
        [MaxLength(100)]
        public string LastName { get; set; }

    }
}
