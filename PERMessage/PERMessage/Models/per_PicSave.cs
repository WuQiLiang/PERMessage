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
    
    public partial class per_PicSave
    {
        public long per_PicID { get; set; }
        public Nullable<long> per_P_ID { get; set; }
        public string per_Pic_Name { get; set; }
        public string per_Pic_size { get; set; }
        public byte[] per_Pic_content { get; set; }
    
        public virtual per_InfoData per_InfoData { get; set; }
    }
}
