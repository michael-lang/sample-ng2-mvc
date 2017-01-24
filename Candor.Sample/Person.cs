using System;

namespace Candor.Sample
{
    /// <summary>
    /// A user of the system that wants to join or host a trip.
    /// </summary>
    public class Person
    {
        /// <summary>
        /// The system generated identity for this person or user.
        /// </summary>
        public string PersonId { get; set; }
        /// <summary>
        /// The person's first name.
        /// </summary>
        public string FirstName { get; set; }
        /// <summary>
        /// The person's last name.
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// A number to contact the person in regards to any planned trips as driver or rider.
        /// </summary>
        public string ContactPhoneNumber { get; set; }
    }
}
