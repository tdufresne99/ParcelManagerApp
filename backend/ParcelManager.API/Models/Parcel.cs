using Microsoft.EntityFrameworkCore;

namespace ParcelManager.API.Models;

[Index(nameof(TrackingNumber), IsUnique = true)]
public class Parcel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public double Weight { get; set; } = 0.0;
    public string Status { get; set; } = "Pending";
    public string DeliveryAddress { get; set; } = string.Empty;
    public string TrackingNumber { get; set; } = string.Empty;
}
