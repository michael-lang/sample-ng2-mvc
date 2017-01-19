using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SampleAngular2Mvc.Startup))]
namespace SampleAngular2Mvc
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
