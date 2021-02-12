using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RealEstateAppAPI.Model
{
    public class Houses
    {
        [Key]
        public int HouseID { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Street { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string City { get; set; }
        [Column(TypeName = "nvarchar(14)")]
        public string State { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Zip { get; set; }
        public int SquareFeet { get; set; }
        public int NumBedrooms { get; set; }
        public int NumBaths { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string ShortDescription { get; set; }
        public decimal Price { get; set; }
    }
}
