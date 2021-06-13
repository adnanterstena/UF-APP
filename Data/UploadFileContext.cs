using Microsoft.EntityFrameworkCore;
using NerdyCTask.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NerdyCTask.Data
{
    public class UploadFileContext : DbContext
    {
        public DbSet<tblUploadFiles> tblUploadFiles { get; set; }

        public UploadFileContext(DbContextOptions<UploadFileContext> options) : base(options)
        {
        }
    }
}
