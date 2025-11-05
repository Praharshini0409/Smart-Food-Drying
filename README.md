# Smart Food Drying Weather Dashboard

A responsive and visually appealing weather monitoring and control dashboard for the Smart Food Drying project. This dashboard provides real-time weather data visualization, numerical displays, and AI-powered forecasting capabilities.

## Features

### 🧩 Box 1 – Graph Visualization (Real-Time Parameters)
- Multi-line chart displaying six real-time weather parameters
- Parameters: Humidity, Temperature, Solar Radiation, Wind Speed, Wind Direction, Atmospheric Pressure
- Live data updates with smooth animations
- Interactive tooltips and legends
- Built with Chart.js for optimal performance

### 📊 Box 2 – Current Numerical Data Display
- Real-time numerical readings of all weather parameters
- Beautiful cards with icons and color gradients
- Live status indicators
- Automatic updates when new data arrives

### ⚙️ Box 3 – Time Interval Control
- Dropdown menu to adjust data refresh intervals
- Options: 1 min, 5 min, 10 min, 15 min, 30 min, 1 hr, 1 day
- Visual indicators and auto-refresh status
- Local storage for user preferences

### 🌤️ Box 4 – Navigation Button
- "Go to Forecasting" button for AI predictions
- Feature highlights and progress indicators
- Smooth navigation to forecasting page

### 🌐 Additional Features
- **Dark/Light Mode Toggle**: Modern theme switching
- **Responsive Design**: Works on desktop and mobile
- **Error Handling**: Graceful API error management
- **Loading States**: Smooth loading animations
- **AI Forecasting**: Deep Learning predictions (GRU/RNN)
- **Glassmorphism UI**: Modern, translucent design elements

## Tech Stack

- **Frontend**: React.js with TailwindCSS
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **API**: OpenWeatherMap (configurable)
- **Routing**: React Router DOM
- **State Management**: React Context API

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smart-food-drying-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
```

4. Add your OpenWeatherMap API key to `.env`:
```
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

5. Start the development server:
```bash
npm start
```

6. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## API Configuration

### OpenWeatherMap Setup
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key
3. Add it to your `.env` file

### Alternative APIs
The dashboard is designed to work with:
- OpenWeatherMap (default)
- Tomorrow.io
- Meteostat
- Any weather API with similar data structure

## Project Structure

```
src/
├── components/
│   ├── WeatherDashboard.js      # Main dashboard component
│   ├── WeatherGraph.js          # Chart visualization
│   ├── WeatherDataDisplay.js    # Numerical data display
│   ├── TimeIntervalControl.js   # Interval control
│   ├── NavigationButton.js      # Navigation to forecasting
│   ├── ThemeToggle.js           # Dark/light mode toggle
│   └── ForecastingPage.js       # AI forecasting page
├── context/
│   ├── WeatherContext.js        # Weather data state management
│   └── ThemeContext.js          # Theme state management
├── services/
│   └── weatherAPI.js            # API integration service
└── App.js                       # Main application component
```

## Usage

### Dashboard Navigation
1. **Main Dashboard**: View real-time weather data and controls
2. **Forecasting Page**: Access AI-powered weather predictions
3. **Theme Toggle**: Switch between dark and light modes
4. **Interval Control**: Adjust data refresh rates

### Weather Parameters
- **Temperature**: Current temperature in Celsius
- **Humidity**: Relative humidity percentage
- **Solar Radiation**: Solar irradiance in W/m²
- **Wind Speed**: Wind velocity in km/h
- **Wind Direction**: Wind direction in degrees
- **Atmospheric Pressure**: Barometric pressure in hPa

## Customization

### Styling
- Modify `tailwind.config.js` for custom colors and themes
- Update `src/index.css` for global styles
- Customize component styles in individual files

### API Integration
- Update `src/services/weatherAPI.js` for different APIs
- Modify data transformation functions as needed
- Add authentication headers if required

### Chart Configuration
- Customize chart options in `src/components/WeatherGraph.js`
- Add new chart types or visualizations
- Modify data processing for different metrics

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npx vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload build folder to Netlify
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## Future Enhancements

- [ ] Real-time notifications
- [ ] Data export functionality
- [ ] Custom dashboard layouts
- [ ] Advanced ML model integration
- [ ] Mobile app version
- [ ] Multi-location support
- [ ] Historical data analysis
- [ ] Weather alerts system
