using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SegurosABC.API.Data;
using SegurosABC.API.DTOs;
using SegurosABC.API.Models;

namespace SegurosABC.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AseguradosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<AseguradosController> _logger;

        public AseguradosController(ApplicationDbContext context, ILogger<AseguradosController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Obtiene todos los asegurados con paginación
        /// </summary>
        /// <param name="pageNumber">Número de página (por defecto 1)</param>
        /// <param name="pageSize">Tamaño de página (por defecto 10)</param>
        /// <returns>Lista paginada de asegurados</returns>
        [HttpGet]
        public async Task<ActionResult<PaginatedResponse<AseguradoDto>>> GetAsegurados(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            try
            {
                if (pageNumber < 1) pageNumber = 1;
                if (pageSize < 1) pageSize = 10;
                if (pageSize > 100) pageSize = 100;

                var totalRecords = await _context.Asegurados.CountAsync();
                var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

                var asegurados = await _context.Asegurados
                    .OrderByDescending(a => a.FechaCreacion)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .Select(a => new AseguradoDto
                    {
                        NumeroIdentificacion = a.NumeroIdentificacion,
                        PrimerNombre = a.PrimerNombre,
                        SegundoNombre = a.SegundoNombre,
                        PrimerApellido = a.PrimerApellido,
                        SegundoApellido = a.SegundoApellido,
                        TelefonoContacto = a.TelefonoContacto,
                        Email = a.Email,
                        FechaNacimiento = a.FechaNacimiento,
                        ValorEstimadoSeguro = a.ValorEstimadoSeguro,
                        Observaciones = a.Observaciones,
                        FechaCreacion = a.FechaCreacion,
                        FechaActualizacion = a.FechaActualizacion
                    })
                    .ToListAsync();

                var response = new PaginatedResponse<AseguradoDto>
                {
                    Data = asegurados,
                    PageNumber = pageNumber,
                    PageSize = pageSize,
                    TotalPages = totalPages,
                    TotalRecords = totalRecords,
                    HasPreviousPage = pageNumber > 1,
                    HasNextPage = pageNumber < totalPages
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener asegurados");
                return StatusCode(500, "Error interno del servidor");
            }
        }

        /// <summary>
        /// Obtiene un asegurado por su número de identificación
        /// </summary>
        /// <param name="id">Número de identificación del asegurado</param>
        /// <returns>Asegurado encontrado</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<AseguradoDto>> GetAsegurado(long id)
        {
            try
            {
                var asegurado = await _context.Asegurados.FindAsync(id);

                if (asegurado == null)
                {
                    return NotFound(new { message = $"No se encontró el asegurado con identificación {id}" });
                }

                var aseguradoDto = new AseguradoDto
                {
                    NumeroIdentificacion = asegurado.NumeroIdentificacion,
                    PrimerNombre = asegurado.PrimerNombre,
                    SegundoNombre = asegurado.SegundoNombre,
                    PrimerApellido = asegurado.PrimerApellido,
                    SegundoApellido = asegurado.SegundoApellido,
                    TelefonoContacto = asegurado.TelefonoContacto,
                    Email = asegurado.Email,
                    FechaNacimiento = asegurado.FechaNacimiento,
                    ValorEstimadoSeguro = asegurado.ValorEstimadoSeguro,
                    Observaciones = asegurado.Observaciones,
                    FechaCreacion = asegurado.FechaCreacion,
                    FechaActualizacion = asegurado.FechaActualizacion
                };

                return Ok(aseguradoDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener asegurado con ID {Id}", id);
                return StatusCode(500, "Error interno del servidor");
            }
        }

        /// <summary>
        /// Filtra asegurados por número de identificación (búsqueda parcial)
        /// </summary>
        /// <param name="numeroIdentificacion">Número o parte del número de identificación</param>
        /// <returns>Lista de asegurados que coinciden con el filtro</returns>
        [HttpGet("filtrar/{numeroIdentificacion}")]
        public async Task<ActionResult<List<AseguradoDto>>> FiltrarPorIdentificacion(string numeroIdentificacion)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(numeroIdentificacion))
                {
                    return BadRequest(new { message = "El número de identificación no puede estar vacío" });
                }

                var asegurados = await _context.Asegurados
                    .Where(a => a.NumeroIdentificacion.ToString().Contains(numeroIdentificacion))
                    .OrderByDescending(a => a.FechaCreacion)
                    .Select(a => new AseguradoDto
                    {
                        NumeroIdentificacion = a.NumeroIdentificacion,
                        PrimerNombre = a.PrimerNombre,
                        SegundoNombre = a.SegundoNombre,
                        PrimerApellido = a.PrimerApellido,
                        SegundoApellido = a.SegundoApellido,
                        TelefonoContacto = a.TelefonoContacto,
                        Email = a.Email,
                        FechaNacimiento = a.FechaNacimiento,
                        ValorEstimadoSeguro = a.ValorEstimadoSeguro,
                        Observaciones = a.Observaciones,
                        FechaCreacion = a.FechaCreacion,
                        FechaActualizacion = a.FechaActualizacion
                    })
                    .ToListAsync();

                return Ok(asegurados);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al filtrar asegurados");
                return StatusCode(500, "Error interno del servidor");
            }
        }

        /// <summary>
        /// Crea un nuevo asegurado
        /// </summary>
        /// <param name="createDto">Datos del asegurado a crear</param>
        /// <returns>Asegurado creado</returns>
        [HttpPost]
        public async Task<ActionResult<AseguradoDto>> CreateAsegurado([FromBody] CreateAseguradoDto createDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Verificar si ya existe un asegurado con ese número de identificación
                var existeAsegurado = await _context.Asegurados
                    .AnyAsync(a => a.NumeroIdentificacion == createDto.NumeroIdentificacion);

                if (existeAsegurado)
                {
                    return Conflict(new { message = $"Ya existe un asegurado con el número de identificación {createDto.NumeroIdentificacion}" });
                }

                // Verificar si ya existe un asegurado con ese email
                var existeEmail = await _context.Asegurados
                    .AnyAsync(a => a.Email == createDto.Email);

                if (existeEmail)
                {
                    return Conflict(new { message = $"Ya existe un asegurado con el email {createDto.Email}" });
                }

                // Validar que la fecha de nacimiento no sea futura
                if (createDto.FechaNacimiento > DateTime.Today)
                {
                    return BadRequest(new { message = "La fecha de nacimiento no puede ser en el futuro" });
                }

                // Validar edad mínima (por ejemplo, 18 años)
                var edad = DateTime.Today.Year - createDto.FechaNacimiento.Year;
                if (createDto.FechaNacimiento.Date > DateTime.Today.AddYears(-edad)) edad--;

                if (edad < 18)
                {
                    return BadRequest(new { message = "El asegurado debe ser mayor de 18 años" });
                }

                var asegurado = new Asegurado
                {
                    NumeroIdentificacion = createDto.NumeroIdentificacion,
                    PrimerNombre = createDto.PrimerNombre.Trim(),
                    SegundoNombre = createDto.SegundoNombre?.Trim(),
                    PrimerApellido = createDto.PrimerApellido.Trim(),
                    SegundoApellido = createDto.SegundoApellido.Trim(),
                    TelefonoContacto = createDto.TelefonoContacto.Trim(),
                    Email = createDto.Email.Trim().ToLower(),
                    FechaNacimiento = createDto.FechaNacimiento,
                    ValorEstimadoSeguro = createDto.ValorEstimadoSeguro,
                    Observaciones = createDto.Observaciones?.Trim(),
                    FechaCreacion = DateTime.Now
                };

                _context.Asegurados.Add(asegurado);
                await _context.SaveChangesAsync();

                var aseguradoDto = new AseguradoDto
                {
                    NumeroIdentificacion = asegurado.NumeroIdentificacion,
                    PrimerNombre = asegurado.PrimerNombre,
                    SegundoNombre = asegurado.SegundoNombre,
                    PrimerApellido = asegurado.PrimerApellido,
                    SegundoApellido = asegurado.SegundoApellido,
                    TelefonoContacto = asegurado.TelefonoContacto,
                    Email = asegurado.Email,
                    FechaNacimiento = asegurado.FechaNacimiento,
                    ValorEstimadoSeguro = asegurado.ValorEstimadoSeguro,
                    Observaciones = asegurado.Observaciones,
                    FechaCreacion = asegurado.FechaCreacion,
                    FechaActualizacion = asegurado.FechaActualizacion
                };

                return CreatedAtAction(nameof(GetAsegurado), new { id = asegurado.NumeroIdentificacion }, aseguradoDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear asegurado");
                return StatusCode(500, "Error interno del servidor");
            }
        }

        /// <summary>
        /// Actualiza un asegurado existente
        /// </summary>
        /// <param name="id">Número de identificación del asegurado</param>
        /// <param name="updateDto">Datos actualizados del asegurado</param>
        /// <returns>Asegurado actualizado</returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<AseguradoDto>> UpdateAsegurado(long id, [FromBody] UpdateAseguradoDto updateDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var asegurado = await _context.Asegurados.FindAsync(id);

                if (asegurado == null)
                {
                    return NotFound(new { message = $"No se encontró el asegurado con identificación {id}" });
                }

                // Verificar si el email ya está siendo usado por otro asegurado
                var existeEmail = await _context.Asegurados
                    .AnyAsync(a => a.Email == updateDto.Email && a.NumeroIdentificacion != id);

                if (existeEmail)
                {
                    return Conflict(new { message = $"El email {updateDto.Email} ya está siendo usado por otro asegurado" });
                }

                // Validar que la fecha de nacimiento no sea futura
                if (updateDto.FechaNacimiento > DateTime.Today)
                {
                    return BadRequest(new { message = "La fecha de nacimiento no puede ser en el futuro" });
                }

                // Validar edad mínima
                var edad = DateTime.Today.Year - updateDto.FechaNacimiento.Year;
                if (updateDto.FechaNacimiento.Date > DateTime.Today.AddYears(-edad)) edad--;

                if (edad < 18)
                {
                    return BadRequest(new { message = "El asegurado debe ser mayor de 18 años" });
                }

                asegurado.PrimerNombre = updateDto.PrimerNombre.Trim();
                asegurado.SegundoNombre = updateDto.SegundoNombre?.Trim();
                asegurado.PrimerApellido = updateDto.PrimerApellido.Trim();
                asegurado.SegundoApellido = updateDto.SegundoApellido.Trim();
                asegurado.TelefonoContacto = updateDto.TelefonoContacto.Trim();
                asegurado.Email = updateDto.Email.Trim().ToLower();
                asegurado.FechaNacimiento = updateDto.FechaNacimiento;
                asegurado.ValorEstimadoSeguro = updateDto.ValorEstimadoSeguro;
                asegurado.Observaciones = updateDto.Observaciones?.Trim();
                asegurado.FechaActualizacion = DateTime.Now;

                await _context.SaveChangesAsync();

                var aseguradoDto = new AseguradoDto
                {
                    NumeroIdentificacion = asegurado.NumeroIdentificacion,
                    PrimerNombre = asegurado.PrimerNombre,
                    SegundoNombre = asegurado.SegundoNombre,
                    PrimerApellido = asegurado.PrimerApellido,
                    SegundoApellido = asegurado.SegundoApellido,
                    TelefonoContacto = asegurado.TelefonoContacto,
                    Email = asegurado.Email,
                    FechaNacimiento = asegurado.FechaNacimiento,
                    ValorEstimadoSeguro = asegurado.ValorEstimadoSeguro,
                    Observaciones = asegurado.Observaciones,
                    FechaCreacion = asegurado.FechaCreacion,
                    FechaActualizacion = asegurado.FechaActualizacion
                };

                return Ok(aseguradoDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al actualizar asegurado con ID {Id}", id);
                return StatusCode(500, "Error interno del servidor");
            }
        }

        /// <summary>
        /// Elimina un asegurado
        /// </summary>
        /// <param name="id">Número de identificación del asegurado</param>
        /// <returns>Confirmación de eliminación</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsegurado(long id)
        {
            try
            {
                var asegurado = await _context.Asegurados.FindAsync(id);

                if (asegurado == null)
                {
                    return NotFound(new { message = $"No se encontró el asegurado con identificación {id}" });
                }

                _context.Asegurados.Remove(asegurado);
                await _context.SaveChangesAsync();

                return Ok(new { message = $"Asegurado con identificación {id} eliminado exitosamente" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al eliminar asegurado con ID {Id}", id);
                return StatusCode(500, "Error interno del servidor");
            }
        }
    }
}
