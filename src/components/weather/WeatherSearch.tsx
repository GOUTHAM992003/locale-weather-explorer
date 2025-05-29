
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MapPin, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface WeatherSearchProps {
  onSearch: (data: {
    location: string;
    coordinates?: { lat: number; lon: number };
    dateRange?: { start: string; end: string };
  }) => void;
  loading: boolean;
}

export const WeatherSearch = ({ onSearch, loading }: WeatherSearchProps) => {
  const [location, setLocation] = useState('');
  const [inputType, setInputType] = useState<'city' | 'zip' | 'coordinates' | 'landmark'>('city');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [coordinates, setCoordinates] = useState({ lat: '', lon: '' });

  const handleSearch = () => {
    if (!location.trim() && inputType !== 'coordinates') {
      toast({
        title: "Location required",
        description: "Please enter a location to search for weather data.",
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

      if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        toast({
          title: "Invalid coordinates",
          description: "Please enter valid latitude (-90 to 90) and longitude (-180 to 180).",
          variant: "destructive",
        });
        return;
      }
    }

    // Validate date range
    if (startDate && endDate && startDate > endDate) {
      toast({
        title: "Invalid date range",
        description: "Start date must be before or equal to end date.",
        variant: "destructive",
      });
      return;
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

    if (startDate && endDate) {
      searchData.dateRange = {
        start: format(startDate, 'yyyy-MM-dd'),
        end: format(endDate, 'yyyy-MM-dd')
      };
    }

    onSearch(searchData);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation.",
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
      (error) => {
        toast({
          title: "Location access denied",
          description: "Unable to access your current location.",
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
            placeholder="Enter city name (e.g., London, Paris)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        );
      case 'zip':
        return (
          <Input
            placeholder="Enter zip/postal code (e.g., 10001, SW1A 1AA)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        );
      case 'landmark':
        return (
          <Input
            placeholder="Enter landmark (e.g., Statue of Liberty, Eiffel Tower)"
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
        {/* Input Type Selection */}
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
              <SelectItem value="zip">Zip/Postal Code</SelectItem>
              <SelectItem value="landmark">Landmark</SelectItem>
              <SelectItem value="coordinates">GPS Coordinates</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location Input */}
        <div className="space-y-2">
          <Label>Location</Label>
          {renderLocationInput()}
        </div>

        {/* Current Location Button */}
        <Button
          variant="outline"
          onClick={getCurrentLocation}
          className="w-full flex items-center gap-2"
        >
          <MapPin className="h-4 w-4" />
          Use Current Location
        </Button>

        {/* Date Range Selection */}
        <div className="space-y-2">
          <Label>Date Range (Optional)</Label>
          <div className="grid grid-cols-2 gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "End date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Search Button */}
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
