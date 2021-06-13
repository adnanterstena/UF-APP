using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NerdyCTask.Data;
using NerdyCTask.Models;
using NerdyCTask.ViewModels;

namespace NerdyCTask.Controllers
{
    [Authorize]
    [Route("api/upload/")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly UploadFileContext _contextUploadFile;

        public FilesController(IWebHostEnvironment env, UploadFileContext contextUploadFile)
        {
            _env = env;
            _contextUploadFile = contextUploadFile;
        }


        [HttpPost]
        [Route("file")]
        public async Task<IActionResult> Post([FromForm] IFormFile body)
        {
            //Can be used to validate type of data
            if (body.ContentType.StartsWith("image"))
            {

            }

            //Validate file size!
            if (body.Length > 50000)
            {

            }


            string fileName;
            try
            {
                var extension = "." + body.FileName.Split('.')[body.FileName.Split('.').Length - 1];
                fileName = DateTime.Now.Ticks + extension;

                var pathBuilt = Path.Combine(Directory.GetCurrentDirectory(), "App_Data\\Files");

                if(!Directory.Exists(pathBuilt))
                {
                    Directory.CreateDirectory(pathBuilt);
                }

                var path = Path.Combine(Directory.GetCurrentDirectory(), "App_Data\\Files", fileName);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await body.CopyToAsync(stream);
                }

                await SaveFileToDatabaseAsync(body.FileName, body.Length, DateTime.Now, "App_Data/Files/" + fileName);

                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }

        private async Task SaveFileToDatabaseAsync(string fileName, long length, DateTime now, string path)
        {
            tblUploadFiles _tblUploadFiles = new tblUploadFiles() {
                DateTime = now,
                fileName = fileName,
                length = length,
                path = path
            };

            _contextUploadFile.Add(_tblUploadFiles);
            await _contextUploadFile.SaveChangesAsync();
        }




        [Route("GetFiles")]
        [HttpGet]
        public async Task<object> getFilesTbl()
        {
            var result = await _contextUploadFile.tblUploadFiles.ToListAsync();

            return Ok(result);
        }




    }
}
