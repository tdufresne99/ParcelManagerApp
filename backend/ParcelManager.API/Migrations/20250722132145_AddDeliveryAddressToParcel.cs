using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ParcelManager.API.Migrations
{
    /// <inheritdoc />
    public partial class AddDeliveryAddressToParcel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DeliveryAddress",
                table: "Parcels",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryAddress",
                table: "Parcels");
        }
    }
}
