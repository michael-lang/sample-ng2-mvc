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
    public class MockPersonProvider : PersonProvider
    {
        private List<Person> _mockData = null;
        public string JsonDataPath { get; set; }

        public MockPersonProvider()
        {
            Initialize("mock", new NameValueCollection());
        }
        public MockPersonProvider(string name)
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
            var items = JsonConvert.DeserializeObject<List<Person>>(json);
            _mockData = items;
        }

        public override Person GetById(string locationId)
        {
            if (_mockData == null)
                LoadSampleData();

            return (_mockData ?? new List<Person>())
                .FirstOrDefault(x => x.PersonId.Equals(locationId, StringComparison.InvariantCultureIgnoreCase));
        }

        public override IList<Person> Search(string term)
        {
            if (_mockData == null)
                LoadSampleData();

            if (string.IsNullOrWhiteSpace(term))
                return _mockData ?? new List<Person>();

            return (_mockData ?? new List<Person>())
                .Where(x => (x.FirstName.IndexOf(term, StringComparison.InvariantCultureIgnoreCase) >= 0
                || x.LastName.IndexOf(term, StringComparison.InvariantCultureIgnoreCase) >= 0
                || x.ContactPhoneNumber.IndexOf(term, StringComparison.InvariantCultureIgnoreCase) >= 0))
                .OrderBy(x => x.LastName)
                .ThenBy(x => x.FirstName)
                .ToList();
        }

        public override Person Save(Person item)
        {
            if (_mockData == null)
                LoadSampleData();
            if (_mockData == null) //no data loaded
                _mockData = new List<Person>();

            if (string.IsNullOrWhiteSpace(item.PersonId))
            {
                item.PersonId = DateTime.UtcNow.Ticks.ToString(); //TODO: use a better sequence generator
                _mockData.Add(item);
            }
            else
            {
                item.PersonId = item.PersonId.Trim(); //<- normalize data
                var existing = _mockData.FirstOrDefault(x => x.PersonId.Equals(item.PersonId, StringComparison.InvariantCultureIgnoreCase));
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
