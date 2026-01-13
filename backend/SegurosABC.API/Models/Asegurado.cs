using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SegurosABC.API.Models
{
    public class Asegurado
    {
        [Key]
        [Required]
        [Column(TypeName = "bigint")]
        public long NumeroIdentificacion { get; set; }

        [Required]
        [MaxLength(100)]
        public string PrimerNombre { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? SegundoNombre { get; set; }

        [Required]
        [MaxLength(100)]
        public string PrimerApellido { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string SegundoApellido { get; set; } = string.Empty;

        [Required]
        [Phone]
        [MaxLength(20)]
        public string TelefonoContacto { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(200)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Date)]
        public DateTime FechaNacimiento { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal ValorEstimadoSeguro { get; set; }

        [MaxLength(1000)]
        public string? Observaciones { get; set; }

        public DateTime FechaCreacion { get; set; } = DateTime.Now;
        public DateTime? FechaActualizacion { get; set; }
    }
}
