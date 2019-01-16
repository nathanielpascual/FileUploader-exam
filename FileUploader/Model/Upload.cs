using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileUploader.Model
{
	public class Upload
	{
		[Key]
		public int Id { get; set; }

		[StringLength(255)]
		public string FileName { get; set; }

		[StringLength(500)]
		public string FullPath { get; set; }

		public int Length { get; set; }

		public byte[] File { get; set; }
	}
}
