namespace SegurosABC.API.DTOs
{
    public class AseguradoDto
    {
        public long NumeroIdentificacion { get; set; }
        public string PrimerNombre { get; set; } = string.Empty;
        public string? SegundoNombre { get; set; }
        public string PrimerApellido { get; set; } = string.Empty;
        public string SegundoApellido { get; set; } = string.Empty;
        public string TelefonoContacto { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime FechaNacimiento { get; set; }
        public decimal ValorEstimadoSeguro { get; set; }
        public string? Observaciones { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaActualizacion { get; set; }
    }
}
