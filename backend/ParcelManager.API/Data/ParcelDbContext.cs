using Microsoft.EntityFrameworkCore;
using ParcelManager.API.Models;

namespace ParcelManager.API.Data;

public class ParcelDbContext : DbContext
{
    public ParcelDbContext(DbContextOptions<ParcelDbContext> options) : base(options) {}

    public DbSet<Parcel> Parcels => Set<Parcel>();
}