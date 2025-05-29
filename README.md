
# Advanced Weather Application

A comprehensive weather application built as a submission for PM Accelerator, featuring real-time weather data, location search, and full CRUD operations.

## Developer

**Gautam** - Built for PM Accelerator  
Learn more at: [PM Accelerator](https://www.linkedin.com/company/product-manager-accelerator)

## Features

### 🔍 Flexible Location Search
- City name search (e.g., "London", "New York")
- Zip/postal code lookup (e.g., "10001", "SW1A 1AA")
- GPS coordinates (e.g., "40.7128,-74.0060")
- Landmark search (e.g., "Statue of Liberty")
- Current location detection using browser geolocation

### 📊 Weather Information
- **Current Weather**: Temperature, humidity, pressure, wind speed/direction, visibility
- **5-Day Forecast**: Extended weather predictions
- **Dual Units**: Display in both Celsius and Fahrenheit
- **Weather Icons**: Visual representation of weather conditions

### 💾 CRUD Operations
- **Create**: Save weather queries with location and timestamp
- **Read**: View all previously saved weather records
- **Update**: Modify saved location data and refresh weather information
- **Delete**: Remove saved weather entries
- **Persistent Storage**: Data saved locally with browser localStorage

### 📤 Export Functionality
- Export saved weather data in multiple formats:
  - CSV (Comma-separated values)
  - JSON (JavaScript Object Notation)
  - XML (Extensible Markup Language)
- Date range filtering for exports

### 🗺️ Interactive Maps
- Location visualization using OpenStreetMap
- External links to Google Maps and OpenStreetMap
- Coordinate display with precise latitude/longitude

### ✅ Input Validation & Error Handling
- Location validation through API lookup
- Graceful handling of network errors
- User-friendly error messages
- Input sanitization and validation

## Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui component library
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Data Storage**: Browser localStorage (ready for database integration)

## Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd advanced-weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

## Usage

1. **Search for Weather**
   - Enter a location in the search field (city, zip code, coordinates, or landmark)
   - Or click "Use Current Location" to get weather for your location
   - View current conditions and 5-day forecast

2. **Save Weather Data**
   - Click "Save Weather Data" to store the current search results
   - Add optional notes for future reference

3. **Manage Saved Records**
   - View all saved weather records in the "Saved Weather Records" section
   - Update location data and refresh weather information
   - Delete records you no longer need

4. **Export Data**
   - Use the export functionality to download your saved weather data
   - Choose from CSV, JSON, or XML formats
   - Filter by date range if needed

5. **View Maps**
   - Click on any location to view it on an interactive map
   - Get precise coordinates and external map links

## Future Enhancements

- **Real-time API Integration**: Connect to OpenWeatherMap API for live weather data
- **Database Backend**: Implement PostgreSQL or MongoDB for robust data storage
- **User Authentication**: Add user accounts and profiles
- **Weather Alerts**: Push notifications for severe weather conditions
- **Advanced Analytics**: Charts and graphs for weather trends
- **Mobile App**: React Native version for iOS and Android

## API Integrations (Planned)

- **OpenWeatherMap API**: Real-time weather data
- **Google Maps API**: Enhanced mapping features
- **YouTube API**: Location-based videos
- **Browser Geolocation API**: Current location detection

## Contributing

This project was built as an educational exercise for PM Accelerator. Feel free to fork and enhance!

## License

This project is open source and available under the MIT License.

---

**Built with ❤️ by Gautam for PM Accelerator**
