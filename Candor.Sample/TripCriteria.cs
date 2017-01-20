using System;

namespace Candor.Sample
{
    public class TripCriteria
    {
        public string NearDepartureLocationId { get; set; }
        public string NearArrivalLocationId { get; set; }
        public int NearMiles { get; set; }

        public string DriverId { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime ReturnDate { get; set; }
    }
}
