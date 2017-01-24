using System.Web;
using Candor.Configuration.Provider;
using Candor.Sample;
using Mocks = Candor.Sample.Mocks;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(SampleAngular2Mvc.App_Start.ProviderBootstrapper), "PreStartup")]
[assembly: WebActivatorEx.PostApplicationStartMethod(typeof(SampleAngular2Mvc.App_Start.ProviderBootstrapper), "PostStartup")]

namespace SampleAngular2Mvc.App_Start
{
    public class ProviderBootstrapper
    {
        public static void PreStartup()
        {
        }
        public static void PostStartup()
        {
            InitProviders();
        }

        private static void InitProviders()
        {
            ProviderResolver<TripProvider>.Configure()
                .AppendActive(new Mocks.MockTripProvider() { JsonDataPath = HttpContext.Current.Server.MapPath("~/App_Data/trips.json") });
            ProviderResolver<PersonProvider>.Configure()
                .AppendActive(new Mocks.MockPersonProvider() { JsonDataPath = HttpContext.Current.Server.MapPath("~/App_Data/people.json") });
            ProviderResolver<LocationProvider>.Configure()
                .AppendActive(new Mocks.MockLocationProvider() { JsonDataPath = HttpContext.Current.Server.MapPath("~/App_Data/locations.json") });
        }
    }
}