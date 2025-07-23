using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ParcelManager.API.Migrations
{
    /// <inheritdoc />
    public partial class AddUniqueIndexToTrackingNumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            // Étape 1 : Ajouter la colonne nullable (temporairement)
            migrationBuilder.AddColumn<string>(
                name: "TrackingNumber",
                table: "Parcels",
                type: "TEXT",
                nullable: true);

            // Étape 2 : Remplir les anciennes entrées avec des numéros uniques
            migrationBuilder.Sql(@"
        UPDATE Parcels
        SET TrackingNumber = 
            'TRK-' || SUBSTR(HEX(RANDOMBLOB(8)), 1, 12)
        WHERE TrackingNumber IS NULL;
    ");

            // Étape 3 : Ajouter une contrainte unique
            migrationBuilder.CreateIndex(
                name: "IX_Parcels_TrackingNumber",
                table: "Parcels",
                column: "TrackingNumber",
                unique: true);

            // Étape 4 : Rendre la colonne non nullable
            migrationBuilder.Sql(@"
        UPDATE Parcels
        SET TrackingNumber = 
            'TRK-' || SUBSTR(HEX(RANDOMBLOB(8)), 1, 12)
        WHERE TrackingNumber IS NULL
    ");
            migrationBuilder.AlterColumn<string>(
                name: "TrackingNumber",
                table: "Parcels",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Parcels_TrackingNumber",
                table: "Parcels");

            migrationBuilder.DropColumn(
                name: "TrackingNumber",
                table: "Parcels");
        }
    }
}
