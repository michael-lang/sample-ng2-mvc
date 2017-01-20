using System;

namespace Candor.Sample
{
    /// <summary>
    /// A single commitment to go from point A to B (and possibly back)
    /// </summary>
    public class Trip
    {
        /// <summary>
        /// The system generated unique identity of the trip.
        /// </summary>
        public string TripId { get; set; }
        /// <summary>
        /// The system identity of the departure location (and possibly return location).
        /// </summary>
        public string DepartureLocationId { get; set; }
        /// <summary>
        /// The system identity of the arrival location.
        /// </summary>
        public string ArrivalLocationId { get; set; }
        /// <summary>
        /// The person identity of the driver.
        /// </summary>
        public string DriverId { get; set; }
        /// <summary>
        /// The number of seat positions in the transport vehicle including the driver
        /// (including any applicable luggage required for the duration)
        /// </summary>
        public int SeatCount { get; set; }
        /// <summary>
        /// The date the trip will begin from the departure location to the arrival location.
        /// </summary>
        public DateTime DepartDate { get; set; }
        /// <summary>
        /// Specifies if this trip includes a specific planned return trip.
        /// </summary>
        public bool IncludesReturn { get; set; }
        /// <summary>
        /// The date the trip will begin from the arrival locaation back to the departure location,
        /// or leave as DateTime.MinValue for no return trip.
        /// </summary>
        public DateTime ReturnDate { get; set; }
    }
}
