using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;

namespace Candor.Sample.Mocks
{
    /// <summary>
    /// A sample data implementation, not for production use, data does not persist between app restarts.
    /// </summary>
    public class MockLocationProvider : LocationProvider
    {
        private List<Location> _mockData = null;
        public string JsonDataPath { get; set; }

        public MockLocationProvider()
        {
            Initialize("mock", new NameValueCollection());
        }
        public MockLocationProvider(string name)
        {
            Initialize(name, new NameValueCollection());
        }
        public override void Initialize(string name, NameValueCollection config)
        {
            base.Initialize(name, config);
        }
        private void LoadSampleData()
        {
            var json = File.ReadAllText(JsonDataPath);
            var items = JsonConvert.DeserializeObject<List<Location>>(json);
            _mockData = items;
        }

        public override Location GetById(string locationId)
        {
            if (_mockData == null)
                LoadSampleData();

            return (_mockData ?? new List<Location>())
                .FirstOrDefault(x => x.LocationId.Equals(locationId, StringComparison.InvariantCultureIgnoreCase));
        }

        public override IList<Location> Search(string term)
        {
            if (_mockData == null)
                LoadSampleData();

            if (string.IsNullOrWhiteSpace(term))
                return _mockData ?? new List<Location>();

            return (_mockData ?? new List<Location>())
                .Where(x => (x.Name.IndexOf(term, StringComparison.InvariantCultureIgnoreCase) >= 0))
                .OrderBy(x => x.Name)
                .ToList();
            //TODO: later add parsing of the term into lat/lng pair and find nearest 10 locations - maybe just in the real datasource
        }

        public override Location Save(Location item)
        {
            if (_mockData == null)
                LoadSampleData();
            if (_mockData == null) //no data loaded
                _mockData = new List<Location>();

            if (string.IsNullOrWhiteSpace(item.LocationId))
            {
                item.LocationId = DateTime.UtcNow.Ticks.ToString(); //TODO: use a better sequence generator
                _mockData.Add(item);
            }
            else
            {
                item.LocationId = item.LocationId.Trim(); //<- normalize data
                var existing = _mockData.FirstOrDefault(x => x.LocationId.Equals(item.LocationId, StringComparison.InvariantCultureIgnoreCase));
                if (existing == null)
                    _mockData.Add(item);
                else
                {   //update for a list...
                    _mockData.Remove(existing);
                    _mockData.Add(item);
                }
            }
            return item;
        }
    }
}
