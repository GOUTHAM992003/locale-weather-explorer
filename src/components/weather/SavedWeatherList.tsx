
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Edit, 
  Trash2, 
  Save, 
  X, 
  MapPin, 
  Thermometer, 
  Calendar,
  Clock
} from 'lucide-react';
import { WeatherData } from '@/pages/Index';
import { toast } from '@/hooks/use-toast';

interface SavedWeatherListProps {
  savedWeatherData: WeatherData[];
  onUpdate: (id: string, updatedData: WeatherData) => void;
  onDelete: (id: string) => void;
}

export const SavedWeatherList = ({ savedWeatherData, onUpdate, onDelete }: SavedWeatherListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLocation, setEditLocation] = useState('');

  const handleEdit = (item: WeatherData) => {
    setEditingId(item.id!);
    setEditLocation(item.location);
  };

  const handleSaveEdit = async (item: WeatherData) => {
    if (!editLocation.trim()) {
      toast({
        title: "Location required",
        description: "Please enter a valid location.",
        variant: "destructive",
      });
      return;
    }

    // In a real application, you would re-fetch weather data here
    const updatedData: WeatherData = {
      ...item,
      location: editLocation,
      timestamp: new Date().toISOString(),
      // Update with new mock data to simulate re-fetching
      current: {
        ...item.current,
        temperature: Math.round(Math.random() * 30 + 10),
        humidity: Math.round(Math.random() * 50 + 30),
        condition: ['Clear', 'Cloudy', 'Rainy', 'Sunny'][Math.floor(Math.random() * 4)]
      }
    };

    onUpdate(item.id!, updatedData);
    setEditingId(null);
    setEditLocation('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditLocation('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this weather record?')) {
      onDelete(id);
    }
  };

  if (savedWeatherData.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg text-gray-500 mb-2">No saved weather data</p>
          <p className="text-sm text-gray-400">
            Search for weather and save it to see your records here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Saved Weather Records</h2>
        <Badge variant="secondary">
          {savedWeatherData.length} record{savedWeatherData.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid gap-4">
        {savedWeatherData.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {editingId === item.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        value={editLocation}
                        onChange={(e) => setEditLocation(e.target.value)}
                        className="max-w-xs"
                        placeholder="Enter new location"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSaveEdit(item)}
                        className="flex items-center gap-1"
                      >
                        <Save className="h-3 w-3" />
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4 text-gray-600" />
                      <CardTitle className="text-lg">{item.location}</CardTitle>
                    </>
                  )}
                </div>
                
                {editingId !== item.id && (
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id!)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Current Weather */}
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Thermometer className="h-6 w-6 text-blue-600" />
                  <div>
                    <div className="font-semibold text-blue-800">
                      {item.current.temperature}°C
                    </div>
                    <div className="text-sm text-blue-600">
                      {item.current.condition}
                    </div>
                  </div>
                </div>

                {/* Date Range */}
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                  <div>
                    <div className="font-semibold text-green-800">
                      {item.dateRange ? 'Date Range' : 'Single Query'}
                    </div>
                    <div className="text-sm text-green-600">
                      {item.dateRange 
                        ? `${item.dateRange.start} to ${item.dateRange.end}`
                        : new Date(item.timestamp).toLocaleDateString()
                      }
                    </div>
                  </div>
                </div>

                {/* Timestamp */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="h-6 w-6 text-gray-600" />
                  <div>
                    <div className="font-semibold text-gray-800">Saved</div>
                    <div className="text-sm text-gray-600">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="text-center p-2 bg-white rounded border">
                  <div className="text-gray-600">Humidity</div>
                  <div className="font-semibold">{item.current.humidity}%</div>
                </div>
                <div className="text-center p-2 bg-white rounded border">
                  <div className="text-gray-600">Pressure</div>
                  <div className="font-semibold">{item.current.pressure} hPa</div>
                </div>
                <div className="text-center p-2 bg-white rounded border">
                  <div className="text-gray-600">Wind</div>
                  <div className="font-semibold">{item.current.windSpeed} km/h</div>
                </div>
                <div className="text-center p-2 bg-white rounded border">
                  <div className="text-gray-600">Visibility</div>
                  <div className="font-semibold">{item.current.visibility} km</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
