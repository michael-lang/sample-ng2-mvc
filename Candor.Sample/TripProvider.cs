using System;
using System.Collections.Generic;
using System.Configuration.Provider;

namespace Candor.Sample
{
    public abstract class TripProvider : ProviderBase
    {
        /// <summary>
        /// retrieve an existing trip details by the identity.
        /// </summary>
        /// <param name="tripId"></param>
        /// <returns></returns>
        public abstract Trip GetById(string tripId);
        /// <summary>
        /// Search for trips that match supplied criteria.
        /// </summary>
        /// <param name="criteria">search parameters</param>
        /// <returns></returns>
        public abstract IList<Trip> Search(TripCriteria criteria);
        /// <summary>
        /// Creates a new trip.
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public abstract Trip Save(Trip item);
    }
}
