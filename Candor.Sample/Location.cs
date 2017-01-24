using System;

namespace Candor.Sample
{
    /// <summary>
    /// A location to be travelled to as part of a trip.
    /// </summary>
    /// <remarks>
    /// For far away destinations you may want to use city names,
    /// while for close trips you may want to use specific address locations.
    /// </remarks>
    public class Location
    {
        /// <summary>
        /// The system generated identity for this location.
        /// </summary>
        public string LocationId { get; set; }
        /// <summary>
        /// A user friendly name of the location or geographic area.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// The latitude of the location, for distance calculations.
        /// </summary>
        public decimal Lat { get; set; }
        /// <summary>
        /// The longitude of the location, for distance calculations.
        /// </summary>
        public decimal Long { get; set; }
    }
}
