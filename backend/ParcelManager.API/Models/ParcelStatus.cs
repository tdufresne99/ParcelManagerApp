namespace ParcelManager.API.Models;

public class ParcelStatus
{
    public int Id { get; set; }
    public string Value { get; set; } = string.Empty;
    public string LabelFr { get; set; } = string.Empty;
    public string LabelEn { get; set; } = string.Empty;
}
