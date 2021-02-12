using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstateAppAPI.Model;

namespace RealEstateAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HousesController : ControllerBase
    {
        private readonly RealEstateDBContext _context;

        public HousesController(RealEstateDBContext context)
        {
            _context = context;
        }

        // GET: api/Houses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Houses>>> GetHouses()
        {
            return await _context.Houses.ToListAsync();
        }

        // GET: api/Houses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Houses>> GetHouses(int id)
        {
            var houses = await _context.Houses.FindAsync(id);

            if (houses == null)
            {
                return NotFound();
            }

            return houses;
        }

        // PUT: api/Houses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHouses(int id, Houses houses)
        {
            houses.HouseID = id;

            _context.Entry(houses).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HousesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Houses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Houses>> PostHouses(Houses houses)
        {
            _context.Houses.Add(houses);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHouses", new { id = houses.HouseID }, houses);
        }

        // DELETE: api/Houses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Houses>> DeleteHouses(int id)
        {
            var houses = await _context.Houses.FindAsync(id);
            if (houses == null)
            {
                return NotFound();
            }

            _context.Houses.Remove(houses);
            await _context.SaveChangesAsync();

            return houses;
        }

        private bool HousesExists(int id)
        {
            return _context.Houses.Any(e => e.HouseID == id);
        }
    }
}
