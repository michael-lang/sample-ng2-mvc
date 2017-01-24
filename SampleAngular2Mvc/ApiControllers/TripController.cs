using Candor.Configuration.Provider;
using Candor.Sample;
using SampleAngular2Mvc.Models;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SampleAngular2Mvc.ApiControllers
{
    [RoutePrefix("api/trip")]
    public class TripController : ApiController
    {
        [Route("{id}")]
        public HttpResponseMessage Get(string id)
        {
            var item = ProviderResolver<TripProvider>.Get.Provider.GetById(id);
            return Request.CreateResponse(HttpStatusCode.OK, item);
        }
        [HttpGet]
        [Route("search")]
        public HttpResponseMessage GetSearch(TripCriteria model)
        {
            var items = ProviderResolver<TripProvider>.Get.Provider.Search(model);
            return Request.CreateResponse(HttpStatusCode.OK, items);
        }
        [HttpPost]
        [Route("")]
        public HttpResponseMessage Post(TripModel model)
        {
            if (model == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "no trip supplied" });
            var updated = ProviderResolver<TripProvider>.Get.Provider.Save(model);
            return Request.CreateResponse(HttpStatusCode.OK, updated);
        }
    }
}
