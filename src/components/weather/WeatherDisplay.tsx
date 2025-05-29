
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Thermometer, 
  Droplets, 
  Gauge, 
  Eye, 
  Wind, 
  Compass,
  Calendar,
  MapPin
} from 'lucide-react';
import { WeatherData } from '@/pages/Index';

interface WeatherDisplayProps {
  weatherData: WeatherData;
}

export const WeatherDisplay = ({ weatherData }: WeatherDisplayProps) => {
  const { location, current, forecast, timestamp, coordinates } = weatherData;

  const formatTemperature = (temp: number) => {
    return {
      celsius: Math.round(temp),
      fahrenheit: Math.round((temp * 9/5) + 32)
    };
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  const currentTemp = formatTemperature(current.temperature);

  return (
    <div className="space-y-6">
      {/* Current Weather */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {location}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {coordinates.lat.toFixed(4)}, {coordinates.lon.toFixed(4)}
              </p>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(timestamp).toLocaleDateString()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main Weather Info */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600">
                  {currentTemp.celsius}°C
                </div>
                <div className="text-2xl text-gray-600">
                  {currentTemp.fahrenheit}°F
                </div>
                <div className="text-lg font-medium text-gray-700 mt-2">
                  {current.condition}
                </div>
                <div className="text-sm text-gray-500">
                  {current.description}
                </div>
              </div>
            </div>

            {/* Detailed Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Droplets className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-600">Humidity</div>
                  <div className="font-semibold">{current.humidity}%</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <Gauge className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-sm text-gray-600">Pressure</div>
                  <div className="font-semibold">{current.pressure} hPa</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                <Eye className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-sm text-gray-600">Visibility</div>
                  <div className="font-semibold">{current.visibility} km</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                <Wind className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-sm text-gray-600">Wind</div>
                  <div className="font-semibold">
                    {current.windSpeed} km/h {getWindDirection(current.windDirection)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5-Day Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            5-Day Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {forecast.map((day, index) => {
              const minTemp = formatTemperature(day.temperature.min);
              const maxTemp = formatTemperature(day.temperature.max);
              
              return (
                <div
                  key={index}
                  className="text-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-sm text-gray-600 mb-2">
                    {new Date(day.date).toLocaleDateString('en', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  
                  <div className="mb-2">
                    <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <Thermometer className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-xs text-gray-600">{day.condition}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="font-semibold text-gray-800">
                      {maxTemp.celsius}°C / {maxTemp.fahrenheit}°F
                    </div>
                    <div className="text-sm text-gray-600">
                      {minTemp.celsius}°C / {minTemp.fahrenheit}°F
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
