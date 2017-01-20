using System;
using System.Collections.Generic;
using System.Configuration.Provider;

namespace Candor.Sample
{
    public abstract class PersonProvider : ProviderBase
    {
        /// <summary>
        /// retrieve an existing person details by the identity.
        /// </summary>
        /// <param name="personId"></param>
        /// <returns></returns>
        public abstract Person GetById(string personId);
        /// <summary>
        /// Search for people that partially match a term, such as for a search filter box.
        /// </summary>
        /// <param name="term">A full or partial match.</param>
        /// <returns></returns>
        public abstract IList<Person> Search(string term);
        /// <summary>
        /// Creates a new person.
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public abstract Person Save(Person item);
    }
}
