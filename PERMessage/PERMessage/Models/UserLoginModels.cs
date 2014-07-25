using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PERMessage.Models
{
    public class UserLoginModels
    {

        [Display(Name = "用户名")]
        public string UserName { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "密码")]
        public string Password { get; set; }
    }
}