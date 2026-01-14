using System.ComponentModel.DataAnnotations;

namespace SegurosABC.API.DTOs
{
    public class UpdateAseguradoDto
    {
        [Required(ErrorMessage = "El primer nombre es requerido")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "El primer nombre debe tener entre 2 y 100 caracteres")]
        public string PrimerNombre { get; set; } = string.Empty;

        [StringLength(100, ErrorMessage = "El segundo nombre no puede exceder 100 caracteres")]
        public string? SegundoNombre { get; set; }

        [Required(ErrorMessage = "El primer apellido es requerido")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "El primer apellido debe tener entre 2 y 100 caracteres")]
        public string PrimerApellido { get; set; } = string.Empty;

        [Required(ErrorMessage = "El segundo apellido es requerido")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "El segundo apellido debe tener entre 2 y 100 caracteres")]
        public string SegundoApellido { get; set; } = string.Empty;

        [Required(ErrorMessage = "El teléfono de contacto es requerido")]
        [StringLength(20, ErrorMessage = "El teléfono no puede exceder 20 caracteres")]
        public string TelefonoContacto { get; set; } = string.Empty;

        [Required(ErrorMessage = "El email es requerido")]
        [EmailAddress(ErrorMessage = "El formato del email no es válido")]
        [StringLength(200, ErrorMessage = "El email no puede exceder 200 caracteres")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "La fecha de nacimiento es requerida")]
        [DataType(DataType.Date)]
        public DateTime FechaNacimiento { get; set; }

        [Required(ErrorMessage = "El valor estimado del seguro es requerido")]
        [Range(0.01, double.MaxValue, ErrorMessage = "El valor estimado debe ser mayor a 0")]
        public decimal ValorEstimadoSeguro { get; set; }

        [StringLength(1000, ErrorMessage = "Las observaciones no pueden exceder 1000 caracteres")]
        public string? Observaciones { get; set; }
    }
}
