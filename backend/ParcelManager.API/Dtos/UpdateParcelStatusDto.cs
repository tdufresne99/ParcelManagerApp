using System.ComponentModel.DataAnnotations;

public class UpdateParcelStatusDto
{
    [Required]
    [StringLength(100)]
    public string Status { get; set; } = string.Empty;
}
