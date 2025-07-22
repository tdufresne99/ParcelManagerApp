using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParcelManager.API.Data;
using ParcelManager.API.Models;

namespace ParcelManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ParcelStatusController : ControllerBase
{
    private readonly ParcelDbContext _context;

    public ParcelStatusController(ParcelDbContext context)
    {
        _context = context;
    }

    // GET: api/parcel-statuses
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ParcelStatus>>> GetParcelStatuses()
    {
        return await _context.ParcelStatuses.ToListAsync();
    }

    // POST: api/parcel-statuses
    [HttpPost]
    public async Task<ActionResult<ParcelStatus>> AddParcelStatus(ParcelStatus parcelStatus)
    {
        _context.ParcelStatuses.Add(parcelStatus);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetParcelStatuses), new { id = parcelStatus.Id }, parcelStatus);
    }
}