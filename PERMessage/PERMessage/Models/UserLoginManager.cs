using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PERMessage.Models;
using PERMessage.Service;

namespace PERMessage.Models
{
    public class UserLoginManager
    {
          private UserSrevice userService = null;
          public UserLoginManager()
        {
            userService = new  UserSrevice();
        }
        /// <summary>
        /// 管理员登陆状态
        /// </summary>
        /// <param name="adminName"></param>
        /// <param name="Password"></param>
        /// <param name="loginUser"></param>
        /// <returns></returns>
        public UserLoginStatus userLogin(string adminName, string Password, out per_User loginUser)
        {
            per_User user = userService.getUserByUserName(adminName);
            if (user != null)
            {
                if (user.per_UserPas == Password)
                {
                    if (user.per_User_Flag == (int)UserStatus.isEnable)
                    {
                        loginUser = user;
                        return UserLoginStatus.Success;
                    }
                    else
                    {
                        loginUser = null;
                        return UserLoginStatus.IsDisabled;
                    }
                }
                else
                {
                    loginUser = null;
                    return UserLoginStatus.IsPwdError;
                }
            }
            else
            {
                loginUser = null;
                return UserLoginStatus.IsAccountError;
            }
        }
    }
}