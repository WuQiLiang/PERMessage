//------------------------------------------------------------------------------
// <auto-generated>
//    此代码是根据模板生成的。
//
//    手动更改此文件可能会导致应用程序中发生异常行为。
//    如果重新生成代码，则将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace PERMessage.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class per_User
    {
        public per_User()
        {
            this.per_Borrow = new HashSet<per_Borrow>();
            this.per_Data = new HashSet<per_Data>();
        }
    
        public long per_UserID { get; set; }
        public string per_UserName { get; set; }
        public string per_UserPas { get; set; }
        public long per_User_RoleID { get; set; }
        public int per_User_Flag { get; set; }
    
        public virtual ICollection<per_Borrow> per_Borrow { get; set; }
        public virtual ICollection<per_Data> per_Data { get; set; }
        public virtual per_Role per_Role { get; set; }
    }
}