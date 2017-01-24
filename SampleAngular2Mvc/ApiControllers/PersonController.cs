using Candor.Configuration.Provider;
using Candor.Sample;
using SampleAngular2Mvc.Models;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SampleAngular2Mvc.ApiControllers
{
    [RoutePrefix("api/person")]
    public class PersonController : ApiController
    {
        [Route("{id}")]
        public HttpResponseMessage Get(string id)
        {
            var item = ProviderResolver<PersonProvider>.Get.Provider.GetById(id);
            return Request.CreateResponse(HttpStatusCode.OK, item);
        }
        [HttpGet, HttpPost]
        [Route("search")]
        public HttpResponseMessage GetSearch(PersonCriteriaModel model)
        {
            var items = ProviderResolver<PersonProvider>.Get.Provider.Search(model.Term);
            return Request.CreateResponse(HttpStatusCode.OK, items);
        }
        [HttpPost]
        [Route("")]
        public HttpResponseMessage Post(PersonModel model)
        {
            if (model == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "no person supplied" });
            var updated = ProviderResolver<PersonProvider>.Get.Provider.Save(model);
            return Request.CreateResponse(HttpStatusCode.OK, updated);
        }
    }
}
