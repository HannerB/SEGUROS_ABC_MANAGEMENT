using Microsoft.EntityFrameworkCore;
using SegurosABC.API.Models;

namespace SegurosABC.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Asegurado> Asegurados { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Asegurado>(entity =>
            {
                entity.HasKey(e => e.NumeroIdentificacion);

                entity.Property(e => e.NumeroIdentificacion)
                    .ValueGeneratedNever();

                entity.HasIndex(e => e.Email)
                    .IsUnique();

                entity.Property(e => e.FechaCreacion)
                    .HasDefaultValueSql("GETDATE()");
            });
        }
    }
}
