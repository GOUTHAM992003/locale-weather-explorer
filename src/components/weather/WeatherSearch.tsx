
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface WeatherSearchProps {
  onSearch: (data: {
    location: string;
    coordinates?: { lat: number; lon: number };
  }) => void;
  loading: boolean;
}

export const WeatherSearch = ({ onSearch, loading }: WeatherSearchProps) => {
  const [location, setLocation] = useState('');
  const [inputType, setInputType] = useState<'city' | 'zip' | 'coordinates'>('city');
  const [coordinates, setCoordinates] = useState({ lat: '', lon: '' });

  const handleSearch = () => {
    if (!location.trim() && inputType !== 'coordinates') {
      toast({
        title: "Location required",
        description: "Please enter a location.",
        variant: "destructive",
      });
      return;
    }

    if (inputType === 'coordinates') {
      if (!coordinates.lat || !coordinates.lon) {
        toast({
          title: "Coordinates required",
          description: "Please enter both latitude and longitude.",
          variant: "destructive",
        });
        return;
      }

      const lat = parseFloat(coordinates.lat);
      const lon = parseFloat(coordinates.lon);

      if (isNaN(lat) || isNaN(lon)) {
        toast({
          title: "Invalid coordinates",
          description: "Please enter valid numbers.",
          variant: "destructive",
        });
        return;
      }
    }

    const searchData: any = {
      location: inputType === 'coordinates' 
        ? `${coordinates.lat}, ${coordinates.lon}` 
        : location,
    };

    if (inputType === 'coordinates') {
      searchData.coordinates = {
        lat: parseFloat(coordinates.lat),
        lon: parseFloat(coordinates.lon)
      };
    }

    onSearch(searchData);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Not supported",
        description: "Geolocation not supported.",
        variant: "destructive",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(4);
        const lon = position.coords.longitude.toFixed(4);
        setInputType('coordinates');
        setCoordinates({ lat, lon });
        toast({
          title: "Location detected",
          description: `Current location: ${lat}, ${lon}`,
        });
      },
      () => {
        toast({
          title: "Access denied",
          description: "Unable to access location.",
          variant: "destructive",
        });
      }
    );
  };

  const renderLocationInput = () => {
    switch (inputType) {
      case 'city':
        return (
          <Input
            placeholder="Enter city name (e.g., London)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        );
      case 'zip':
        return (
          <Input
            placeholder="Enter zip code (e.g., 10001)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        );
      case 'coordinates':
        return (
          <div className="space-y-2">
            <Input
              placeholder="Latitude (e.g., 40.7128)"
              value={coordinates.lat}
              onChange={(e) => setCoordinates(prev => ({ ...prev, lat: e.target.value }))}
            />
            <Input
              placeholder="Longitude (e.g., -74.0060)"
              value={coordinates.lon}
              onChange={(e) => setCoordinates(prev => ({ ...prev, lon: e.target.value }))}
            />
          </div>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Weather Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Search Method</Label>
          <Select
            value={inputType}
            onValueChange={(value: any) => {
              setInputType(value);
              setLocation('');
              setCoordinates({ lat: '', lon: '' });
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="city">City Name</SelectItem>
              <SelectItem value="zip">Zip Code</SelectItem>
              <SelectItem value="coordinates">GPS Coordinates</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Location</Label>
          {renderLocationInput()}
        </div>

        <Button
          variant="outline"
          onClick={getCurrentLocation}
          className="w-full flex items-center gap-2"
        >
          <MapPin className="h-4 w-4" />
          Use Current Location
        </Button>

        <Button 
          onClick={handleSearch} 
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search Weather
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
