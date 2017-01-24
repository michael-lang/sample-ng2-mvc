using Candor.Sample;

namespace SampleAngular2Mvc.Models
{
    /// <summary>
    /// Model returning a custom representation of a Person for display purposes.
    /// This may add formatted properties ready for consumption by javascript,
    /// such as formatting date objects or enum values to a good display representation.
    /// </summary>
    public class PersonModel : Person
    {
    }

    public class PersonCriteriaModel
    {
        public string Term { get; set; }
    }
}