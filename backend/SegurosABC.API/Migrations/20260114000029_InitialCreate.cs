using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SegurosABC.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Asegurados",
                columns: table => new
                {
                    NumeroIdentificacion = table.Column<long>(type: "bigint", nullable: false),
                    PrimerNombre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    SegundoNombre = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    PrimerApellido = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    SegundoApellido = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    TelefonoContacto = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Email = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    FechaNacimiento = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ValorEstimadoSeguro = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Observaciones = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    FechaCreacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    FechaActualizacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Asegurados", x => x.NumeroIdentificacion);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Asegurados_Email",
                table: "Asegurados",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Asegurados");
        }
    }
}
