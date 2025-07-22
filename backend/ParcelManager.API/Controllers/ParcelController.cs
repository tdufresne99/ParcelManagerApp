using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParcelManager.API.Data;
using ParcelManager.API.Models;

namespace ParcelManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ParcelController : ControllerBase
{
    private readonly ParcelDbContext _context;

    public ParcelController(ParcelDbContext context)
    {
        _context = context;
    }

    // GET: api/parcel
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Parcel>>> GetParcels()
    {
        return await _context.Parcels.ToListAsync();
    }

    // POST: api/parcel
    [HttpPost]
    public async Task<ActionResult<Parcel>> AddParcel(Parcel parcel)
    {
        _context.Parcels.Add(parcel);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetParcels), new { id = parcel.Id }, parcel);
    }

    // PUT: api/parcel/{id}/deliver
    [HttpPut("{id}/deliver")]
    public async Task<IActionResult> MarkAsDelivered(int id)
    {
        var parcel = await _context.Parcels.FindAsync(id);
        if (parcel == null)
            return NotFound();

        parcel.Status = "Delivered";
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/parcel/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteParcel(int id)
    {
        var parcel = await _context.Parcels.FindAsync(id);
        if (parcel == null)
            return NotFound();

        _context.Parcels.Remove(parcel);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
