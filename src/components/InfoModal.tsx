
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Linkedin, Youtube, Instagram } from 'lucide-react';

interface InfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InfoModal = ({ open, onOpenChange }: InfoModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600">
            Advanced Weather Application
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Developer Info */}
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Developed by Gautam Reddy K</h3>
            <p className="text-gray-600 mb-4">
              This app was built as a submission for PM Accelerator
            </p>
          </div>

          {/* PM Accelerator Details */}
          <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <h3 className="text-2xl font-bold text-center mb-4 text-green-600">About PM Accelerator</h3>
            
            <p className="text-gray-700 mb-4">
              The Product Manager Accelerator Program is designed to support PM professionals through every stage of their careers. 
              From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped 
              over hundreds of students fulfill their career aspirations.
            </p>
            
            <p className="text-gray-700 mb-6">
              Our Product Manager Accelerator community are ambitious and committed. Through our program they have learnt, honed and 
              developed new PM and leadership skills, giving them a strong foundation for their future endeavors.
            </p>

            <h4 className="text-lg font-semibold mb-4 text-blue-600">🚀 Services We Offer:</h4>
            
            <div className="space-y-4 text-sm">
              <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                <h5 className="font-semibold text-purple-600 mb-2">🚀 PMA Pro</h5>
                <p className="text-gray-700">
                  End-to-end product manager job hunting program that helps you master FAANG-level Product Management skills, 
                  conduct unlimited mock interviews, and gain job referrals through our largest alumni network. 25% of our offers 
                  came from tier 1 companies and get paid as high as $800K/year.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
                <h5 className="font-semibold text-indigo-600 mb-2">🚀 AI PM Bootcamp</h5>
                <p className="text-gray-700">
                  Gain hands-on AI Product Management skills by building a real-life AI product with a team of AI Engineers, 
                  data scientists, and designers. We will also help you launch your product with real user engagement using our 
                  100,000+ PM community and social media channels.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                <h5 className="font-semibold text-blue-600 mb-2">🚀 PMA Power Skills</h5>
                <p className="text-gray-700">
                  Designed for existing product managers to sharpen their product management skills, leadership skills, 
                  and executive presentation skills.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <h5 className="font-semibold text-green-600 mb-2">🚀 PMA Leader</h5>
                <p className="text-gray-700">
                  We help you accelerate your product management career, get promoted to Director and product executive levels, 
                  and win in the board room.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500">
                <h5 className="font-semibold text-yellow-600 mb-2">🚀 1:1 Resume Review</h5>
                <p className="text-gray-700 mb-2">
                  We help you rewrite your killer product manager resume to stand out from the crowd, with an interview guarantee. 
                  Get started by using our FREE killer PM resume template used by over 14,000 product managers.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://www.drnancyli.com/pmresume', '_blank')}
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  Free Resume Template
                </Button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg">
              <p className="text-gray-700 mb-4">
                🚀 We also published over 500+ free training and courses.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => window.open('https://www.pmaccelerator.io/', '_blank')}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit Website
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('https://www.youtube.com/c/drnancyli', '_blank')}
                  className="flex items-center gap-2"
                >
                  <Youtube className="h-4 w-4" />
                  YouTube Channel
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('https://www.instagram.com/drnancyli', '_blank')}
                  className="flex items-center gap-2"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram @drnancyli
                </Button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-white p-4 rounded-lg">
              <div>
                <strong>Industry:</strong> E-Learning Providers<br/>
                <strong>Company size:</strong> 2-10 employees<br/>
                <strong>Founded:</strong> 2020
              </div>
              <div>
                <strong>Headquarters:</strong> Boston, MA<br/>
                <strong>Phone:</strong> +1 954-889-1063<br/>
                <strong>LinkedIn Members:</strong> 102+ associated
              </div>
            </div>
          </div>

          {/* Technical Features */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Key Features of This Weather App</h4>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
