
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeatherMapProps {
  coordinates: {
    lat: number;
    lon: number;
  };
  location: string;
}

export const WeatherMap = ({ coordinates, location }: WeatherMapProps) => {
  const { lat, lon } = coordinates;
  
  // Google Maps embed URL
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${lat},${lon}&zoom=12`;
  
  // Fallback to OpenStreetMap iframe
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.01},${lat-0.01},${lon+0.01},${lat+0.01}&marker=${lat},${lon}`;

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/@${lat},${lon},12z`;
    window.open(url, '_blank');
  };

  const openInOpenStreetMap = () => {
    const url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}&zoom=12`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Map View - {location}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={openInGoogleMaps}
                className="flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                Google Maps
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={openInOpenStreetMap}
                className="flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                OpenStreetMap
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Coordinates Display */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-600">Latitude</div>
                <div className="font-mono font-semibold">{lat.toFixed(6)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Longitude</div>
                <div className="font-mono font-semibold">{lon.toFixed(6)}</div>
              </div>
            </div>

            {/* Map Iframe */}
            <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src={osmUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${location}`}
                className="rounded-lg"
              />
            </div>

            {/* Map Info */}
            <div className="text-sm text-gray-600 text-center">
              <p>Interactive map showing the location of {location}</p>
              <p className="mt-1">Click the external link buttons to open in full map applications</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
