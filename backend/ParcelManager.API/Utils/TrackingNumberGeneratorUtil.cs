using ParcelManager.API.Data;

namespace ParcelManager.API.Utils
{
    public static class TrackingNumberGeneratorUtil
    {
        public static string GenerateUniqueTrackingNumber(ParcelDbContext context)
        {
            string trackingNumber;
            do
            {
                trackingNumber = "TRK-" + Guid.NewGuid().ToString("N")[..12].ToUpper();
            } while (context.Parcels.Any(p => p.TrackingNumber == trackingNumber));

            return trackingNumber;
        }
    }
}
