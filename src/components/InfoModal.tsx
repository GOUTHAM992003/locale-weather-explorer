
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Linkedin } from 'lucide-react';

interface InfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InfoModal = ({ open, onOpenChange }: InfoModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600">
            Advanced Weather Application
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Developer Info */}
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Developed by Gautam</h3>
            <p className="text-gray-600 mb-4">
              This app was built as a submission for PM Accelerator
            </p>
            <Button
              variant="outline"
              onClick={() => window.open('https://www.linkedin.com/company/product-manager-accelerator', '_blank')}
              className="flex items-center gap-2 mx-auto"
            >
              <Linkedin className="h-4 w-4" />
              Learn more at PM Accelerator
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Key Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-blue-600">🔍 Flexible Search</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• City name search</li>
                  <li>• Zip/postal code lookup</li>
                  <li>• GPS coordinates</li>
                  <li>• Landmark search</li>
                  <li>• Current location detection</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-green-600">📊 Weather Data</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Current conditions</li>
                  <li>• 5-day forecast</li>
                  <li>• Temperature (°C & °F)</li>
                  <li>• Humidity, pressure, wind</li>
                  <li>• Visibility and conditions</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-purple-600">💾 CRUD Operations</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Save weather queries</li>
                  <li>• View saved records</li>
                  <li>• Update location data</li>
                  <li>• Delete saved entries</li>
                  <li>• Persistent storage</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-orange-600">📤 Export & Maps</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Export to CSV, JSON, XML</li>
                  <li>• Interactive maps</li>
                  <li>• Date range selection</li>
                  <li>• Input validation</li>
                  <li>• Error handling</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Stack */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Technical Stack</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-blue-50 rounded">
                <div className="font-medium">Frontend</div>
                <div className="text-gray-600">React + TypeScript</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded">
                <div className="font-medium">Styling</div>
                <div className="text-gray-600">Tailwind CSS</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded">
                <div className="font-medium">Components</div>
                <div className="text-gray-600">Shadcn/ui</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded">
                <div className="font-medium">Icons</div>
                <div className="text-gray-600">Lucide React</div>
              </div>
            </div>
          </div>

          {/* Future Enhancements */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Planned Enhancements</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Real-time weather API integration (OpenWeatherMap)</li>
                <li>• Database backend with PostgreSQL/MongoDB</li>
                <li>• YouTube API for location videos</li>
                <li>• Google Maps API integration</li>
                <li>• User authentication and profiles</li>
                <li>• Weather alerts and notifications</li>
                <li>• Advanced analytics and charts</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
