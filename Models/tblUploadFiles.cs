using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace NerdyCTask.Models
{
    public class tblUploadFiles
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        public string fileName { get; set; }

        [Required]
        public long length { get; set; }

        [Required]
        public DateTime DateTime { get; set; }

        [Required]
        public string path { get; set; }
    }
}