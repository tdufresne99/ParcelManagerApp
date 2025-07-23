public class CreateParcelDto
{
    public string Name { get; set; } = string.Empty;
    public double Weight { get; set; } = 0.0;
    public string Recipient { get; set; } = string.Empty;
    public string DeliveryAddress { get; set; } = string.Empty;
}
