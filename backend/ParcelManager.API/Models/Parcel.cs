namespace ParcelManager.API.Models;

public class Parcel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public double Weight { get; set; }
    public string Status { get; set; } = "Pending";
}
