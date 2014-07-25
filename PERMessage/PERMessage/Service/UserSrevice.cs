using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PERMessage.Models;

namespace PERMessage.Service
{
    public class UserSrevice
    {
         
        //使用EF的数据库上下文对象
        PERMessageEntities perEn = null;
        //使用构造方法创建该对象
        public UserSrevice()
        {
            perEn = new PERMessageEntities();
        }
        
        /// <summary>
        /// 按照用户名进行查询
        /// </summary>
        /// <param name="UserName">验证的用户名</param>
        /// <returns></returns>
        public per_User getUserByUserName(String UserName)
        { 
        //返回值必须是Entity中的model
            try
            {
                return perEn.per_User.Where(u => u.per_UserName == UserName).Single();
            }
            catch (Exception)
            {
                
                return null;
            }
            
        }

        /// <summary>
        /// 按照主键查询
        /// </summary>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public per_User getUserByUserID(int UserID)
        {
            try
            {
                return perEn.per_User.Single(u => u.per_UserID == UserID);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}