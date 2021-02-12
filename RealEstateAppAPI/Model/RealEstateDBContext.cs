using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealEstateAppAPI.Model
{
    public class RealEstateDBContext:DbContext
    {
        public RealEstateDBContext(DbContextOptions<RealEstateDBContext> options):base(options)
        {

        }
        public DbSet<Houses> Houses { get; set; }
     }
}
