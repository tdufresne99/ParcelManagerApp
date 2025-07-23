using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParcelManager.API.Data;
using ParcelManager.API.Models;
using ParcelManager.API.Utils;

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

    // GET: api/parcel/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Parcel>> GetParcel(int id)
    {
        var parcel = await _context.Parcels.FindAsync(id);
        if (parcel == null)
            return NotFound();

        return parcel;
    }

    // POST: api/parcel
    [HttpPost]
    public async Task<ActionResult<Parcel>> AddParcel(CreateParcelDto parcelDto)
    {
        var parcel = new Parcel
        {
            Name = parcelDto.Name,
            Weight = parcelDto.Weight,
            Recipient = parcelDto.Recipient,
            DeliveryAddress = parcelDto.DeliveryAddress,
            Status = "Pending",
            TrackingNumber = TrackingNumberGeneratorUtil.GenerateUniqueTrackingNumber(_context),
            DeliveryDate = parcelDto.DeliveryDate
        };
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

    // PUT: api/parcel/{id}/status
    [HttpPut("status/{id}")]
    public async Task<IActionResult> UpdateParcelStatus(int id, [FromBody] UpdateParcelStatusDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Status))
            return BadRequest("Status cannot be empty.");

        var parcel = await _context.Parcels.FindAsync(id);
        if (parcel == null)
            return NotFound();

        parcel.Status = dto.Status;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // PUT: api/parcel/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateParcel(int id, [FromBody] Parcel parcel)
    {
        if (parcel == null)
            return BadRequest("Parcel cannot be null.");

        var existingParcel = await _context.Parcels.FindAsync(id);
        if (existingParcel == null)
            return NotFound();

        existingParcel.Name = parcel.Name;
        existingParcel.Weight = parcel.Weight;
        existingParcel.Recipient = parcel.Recipient;
        existingParcel.DeliveryAddress = parcel.DeliveryAddress;
        existingParcel.Status = parcel.Status;
        existingParcel.DeliveryDate = parcel.DeliveryDate;
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
