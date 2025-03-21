import React, { useState, useEffect } from 'react';

interface CityDropdownProps {
  onCityChange: (city: string) => void;
}

function CityDropdown({ onCityChange }: CityDropdownProps) {
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    const apiUrl = 'https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=10000';

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.success) {
        const cityNames = data.result.records.map((record: { שם_ישוב: string }) => record.שם_ישוב);
        setCities(cityNames.sort()); 
      } else {
        console.error('Failed to fetch cities:', data.error);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelectedCity(city);
    onCityChange(city);
  };

  return (
    <div>
      <select value={selectedCity} onChange={handleCityChange}>
        <option value="">בחר עיר</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CityDropdown;