import React, { useState, useEffect } from 'react';
import { WeatherSearch } from '@/components/weather/WeatherSearch';
import { WeatherDisplay } from '@/components/weather/WeatherDisplay';
import { SavedWeatherList } from '@/components/weather/SavedWeatherList';
import { WeatherMap } from '@/components/weather/WeatherMap';
import { InfoModal } from '@/components/InfoModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Info, MapPin, Save, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export interface WeatherData {
  id?: string;
  location: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  current: {
    temperature: number;
    humidity: number;
    pressure: number;
    visibility: number;
    windSpeed: number;
    windDirection: number;
    condition: string;
    icon: string;
    description: string;
  };
  forecast: Array<{
    date: string;
    temperature: {
      min: number;
      max: number;
    };
    condition: string;
    icon: string;
    description: string;
  }>;
  timestamp: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [savedWeatherData, setSavedWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Load saved weather data from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedWeatherData');
    if (saved) {
      setSavedWeatherData(JSON.parse(saved));
    }
  }, []);

  const handleWeatherSearch = async (searchData: {
    location: string;
    coordinates?: { lat: number; lon: number };
    dateRange?: { start: string; end: string };
  }) => {
    setLoading(true);
    try {
      const data = await fetchWeatherData(searchData);
      setWeatherData(data);
      toast({
        title: "Weather data retrieved",
        description: `Weather information for ${data.location} has been loaded.`,
      });
    } catch (error) {
      toast({
        title: "Error fetching weather",
        description: "Unable to retrieve weather data. Please try again.",
        variant: "destructive",
      });
      console.error('Weather fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async (searchData: any): Promise<WeatherData> => {
    // Mock weather data for demonstration
    // In production, this would make actual API calls to OpenWeatherMap
    const mockData: WeatherData = {
      id: Date.now().toString(),
      location: searchData.location,
      coordinates: searchData.coordinates || { lat: 40.7128, lon: -74.0060 },
      current: {
        temperature: Math.round(Math.random() * 30 + 10),
        humidity: Math.round(Math.random() * 50 + 30),
        pressure: Math.round(Math.random() * 100 + 1000),
        visibility: Math.round(Math.random() * 15 + 5),
        windSpeed: Math.round(Math.random() * 20 + 5),
        windDirection: Math.round(Math.random() * 360),
        condition: ['Clear', 'Cloudy', 'Rainy', 'Sunny'][Math.floor(Math.random() * 4)],
        icon: '01d',
        description: 'Clear sky'
      },
      forecast: Array.from({ length: 5 }, (_, i) => ({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        temperature: {
          min: Math.round(Math.random() * 15 + 5),
          max: Math.round(Math.random() * 15 + 20)
        },
        condition: ['Clear', 'Cloudy', 'Rainy', 'Sunny'][Math.floor(Math.random() * 4)],
        icon: '01d',
        description: 'Partly cloudy'
      })),
      timestamp: new Date().toISOString(),
      dateRange: searchData.dateRange
    };

    return mockData;
  };

  const saveWeatherData = () => {
    if (!weatherData) return;
    
    const newSavedData = [...savedWeatherData, weatherData];
    setSavedWeatherData(newSavedData);
    localStorage.setItem('savedWeatherData', JSON.stringify(newSavedData));
    
    toast({
      title: "Weather data saved",
      description: "Weather information has been saved to your records.",
    });
  };

  const updateWeatherData = (id: string, updatedData: WeatherData) => {
    const updated = savedWeatherData.map(item => 
      item.id === id ? updatedData : item
    );
    setSavedWeatherData(updated);
    localStorage.setItem('savedWeatherData', JSON.stringify(updated));
    
    toast({
      title: "Weather data updated",
      description: "Weather record has been updated successfully.",
    });
  };

  const deleteWeatherData = (id: string) => {
    const filtered = savedWeatherData.filter(item => item.id !== id);
    setSavedWeatherData(filtered);
    localStorage.setItem('savedWeatherData', JSON.stringify(filtered));
    
    toast({
      title: "Weather data deleted",
      description: "Weather record has been removed from your saved data.",
    });
  };

  const exportData = (format: 'csv' | 'json' | 'xml') => {
    if (savedWeatherData.length === 0) {
      toast({
        title: "No data to export",
        description: "Please save some weather data first.",
        variant: "destructive",
      });
      return;
    }

    let content = '';
    let filename = '';
    let mimeType = '';

    switch (format) {
      case 'csv':
        content = convertToCSV(savedWeatherData);
        filename = 'weather-data.csv';
        mimeType = 'text/csv';
        break;
      case 'json':
        content = JSON.stringify(savedWeatherData, null, 2);
        filename = 'weather-data.json';
        mimeType = 'application/json';
        break;
      case 'xml':
        content = convertToXML(savedWeatherData);
        filename = 'weather-data.xml';
        mimeType = 'application/xml';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Data exported",
      description: `Weather data exported as ${format.toUpperCase()} file.`,
    });
  };

  const convertToCSV = (data: WeatherData[]) => {
    const headers = ['Location', 'Temperature', 'Humidity', 'Pressure', 'Wind Speed', 'Condition', 'Timestamp'];
    const rows = data.map(item => [
      item.location,
      item.current.temperature,
      item.current.humidity,
      item.current.pressure,
      item.current.windSpeed,
      item.current.condition,
      item.timestamp
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const convertToXML = (data: WeatherData[]) => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<weather-records>\n';
    data.forEach(item => {
      xml += `  <record>\n`;
      xml += `    <location>${item.location}</location>\n`;
      xml += `    <temperature>${item.current.temperature}</temperature>\n`;
      xml += `    <humidity>${item.current.humidity}</humidity>\n`;
      xml += `    <pressure>${item.current.pressure}</pressure>\n`;
      xml += `    <condition>${item.current.condition}</condition>\n`;
      xml += `    <timestamp>${item.timestamp}</timestamp>\n`;
      xml += `  </record>\n`;
    });
    xml += '</weather-records>';
    return xml;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Advanced Weather Application</h1>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowInfo(true)}
              className="h-8 w-8"
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-lg text-gray-600">
            Search for weather by city, zip code, coordinates, or landmarks
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Developed by <span className="font-semibold">Gautam Reddy K</span>
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Search */}
          <div className="lg:col-span-1">
            <WeatherSearch 
              onSearch={handleWeatherSearch}
              loading={loading}
            />
            
            {/* Export Options */}
            {savedWeatherData.length > 0 && (
              <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Export Data
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportData('csv')}
                  >
                    Export CSV
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportData('json')}
                  >
                    Export JSON
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportData('xml')}
                  >
                    Export XML
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Results and Saved Data */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="current" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="current">Current Weather</TabsTrigger>
                <TabsTrigger value="saved">Saved Records</TabsTrigger>
                <TabsTrigger value="map">Map View</TabsTrigger>
              </TabsList>

              <TabsContent value="current" className="space-y-4">
                {weatherData ? (
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <Button onClick={saveWeatherData} className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Weather Data
                      </Button>
                    </div>
                    <WeatherDisplay weatherData={weatherData} />
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">Search for a location to see weather data</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="saved">
                <SavedWeatherList
                  savedWeatherData={savedWeatherData}
                  onUpdate={updateWeatherData}
                  onDelete={deleteWeatherData}
                />
              </TabsContent>

              <TabsContent value="map">
                {weatherData && (
                  <WeatherMap
                    coordinates={weatherData.coordinates}
                    location={weatherData.location}
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Info Modal */}
        <InfoModal open={showInfo} onOpenChange={setShowInfo} />
      </div>
    </div>
  );
};

export default Index;
