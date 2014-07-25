using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PERMessage.Models
{
    public enum UserLoginStatus
    {
        Success,//登录成功
        IsAccountError,//账号错误
        IsPwdError,//密码错误
        IsDisabled//账号禁用
    }
    public enum UserStatus
    {
        isEnable = 1,
        isDisable = 0
    }//用户状态
}