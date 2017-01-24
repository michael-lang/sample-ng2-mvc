using Candor.Configuration.Provider;
using Candor.Sample;
using SampleAngular2Mvc.Models;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SampleAngular2Mvc.ApiControllers
{
    [RoutePrefix("api/location")]
    public class LocationController : ApiController
    {
        [Route("{id}")]
        public HttpResponseMessage Get(string id)
        {
            var item = ProviderResolver<LocationProvider>.Get.Provider.GetById(id);
            return Request.CreateResponse(HttpStatusCode.OK, item);
        }
        [HttpGet]
        [Route("search")]
        public HttpResponseMessage GetSearch(string q)
        {
            var items = ProviderResolver<LocationProvider>.Get.Provider.Search(q);
            return Request.CreateResponse(HttpStatusCode.OK, items);
        }
        [HttpPost]
        [Route("")]
        public HttpResponseMessage Post(LocationModel model)
        {
            if (model == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "no location supplied" });
            var updated = ProviderResolver<LocationProvider>.Get.Provider.Save(model);
            return Request.CreateResponse(HttpStatusCode.OK, updated);
        }
    }
}
