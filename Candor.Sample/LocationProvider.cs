using System;
using System.Collections.Generic;
using System.Configuration.Provider;

namespace Candor.Sample
{
    public abstract class LocationProvider : ProviderBase
    {
        /// <summary>
        /// retrieve an existing location details by the identity.
        /// </summary>
        /// <param name="locationId"></param>
        /// <returns></returns>
        public abstract Location GetById(string locationId);
        /// <summary>
        /// Search for locations that partially match a term, such as for a search filter box.
        /// </summary>
        /// <param name="term">A full or partial match.</param>
        /// <returns></returns>
        public abstract IList<Location> Search(string term);
        /// <summary>
        /// Creates a new location.
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public abstract Location Save(Location item);
    }
}
