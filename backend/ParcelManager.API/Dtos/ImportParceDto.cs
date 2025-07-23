public class ImportParcelDto
{
    public string Name { get; set; } = string.Empty;
    public string Recipient { get; set; } = string.Empty;
    public string DeliveryAddress { get; set; } = string.Empty;
    public double Weight { get; set; } = 0;
    public string Status { get; set; } = string.Empty;
    public DateTime? DeliveryDate { get; set; } = null;
}
