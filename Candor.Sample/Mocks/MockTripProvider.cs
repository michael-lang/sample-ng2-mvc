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
    public class MockTripProvider : TripProvider
    {
        private List<Trip> _mockData = null;
        public string JsonDataPath { get; set; }

        public MockTripProvider()
        {
            Initialize("mock", new NameValueCollection());
        }
        public MockTripProvider(string name)
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
            var items = JsonConvert.DeserializeObject<List<Trip>>(json);
            _mockData = items;
        }

        public override Trip GetById(string locationId)
        {
            if (_mockData == null)
                LoadSampleData();

            return (_mockData ?? new List<Trip>())
                .FirstOrDefault(x => x.TripId.Equals(locationId, StringComparison.InvariantCultureIgnoreCase));
        }

        public override IList<Trip> Search(TripCriteria criteria)
        {
            if (_mockData == null)
                LoadSampleData();

            if (criteria == null)
                return _mockData ?? new List<Trip>();

            return (_mockData ?? new List<Trip>())
                .Where(x => (string.IsNullOrWhiteSpace(criteria.NearDepartureLocationId) || x.DepartureLocationId.IndexOf(criteria.NearDepartureLocationId, StringComparison.InvariantCultureIgnoreCase) >= 0)
                    && (string.IsNullOrWhiteSpace(criteria.NearArrivalLocationId) || x.ArrivalLocationId.IndexOf(criteria.NearArrivalLocationId, StringComparison.InvariantCultureIgnoreCase) >= 0)
                    && (string.IsNullOrWhiteSpace(criteria.DriverId) || x.DriverId == criteria.DriverId)
                    && (criteria.DepartureDate < DateTime.Now || criteria.DepartureDate.Date == x.DepartDate.Date)
                    && (criteria.ReturnDate < DateTime.Now || criteria.ReturnDate.Date == x.ReturnDate.Date)
                 )
                .OrderBy(x => x.DepartDate) //earliest first
                .ToList();
            //TODO: later fuzzy date matches to end of search results (ie. off by day), plus the "near" location criteria
        }

        public override Trip Save(Trip item)
        {
            if (_mockData == null)
                LoadSampleData();
            if (_mockData == null) //no data loaded
                _mockData = new List<Trip>();

            if (string.IsNullOrWhiteSpace(item.TripId))
            {
                item.TripId = DateTime.UtcNow.Ticks.ToString(); //TODO: use a better sequence generator
                _mockData.Add(item);
            }
            else
            {
                item.TripId = item.TripId.Trim(); //<- normalize data
                var existing = _mockData.FirstOrDefault(x => x.TripId.Equals(item.TripId, StringComparison.InvariantCultureIgnoreCase));
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
