# Sentiment Vibe - Advanced Brand Analytics Dashboard

A modern, real-time brand sentiment monitoring dashboard with enhanced analytics, emotion detection, and comprehensive visualizations. Built with React, TypeScript, and Tailwind CSS.

![Dashboard Preview](https://via.placeholder.com/1200x600/0a0a0f/3b82f6?text=Sentiment+Vibe+Dashboard)

## Features

### Core Functionality
- **Real-time Sentiment Tracking** - Monitor overall, employee, and external sentiment scores
- **Multi-Company Support** - Track 6 major tech companies (Meta, Google, Apple, Amazon, Microsoft, Tesla)
- **Historical Trends** - View sentiment changes over 1W, 1M, 3M, 6M, or 1Y periods
- **Live/Demo Mode** - Toggle between live API data and demo mode

### Enhanced Analytics

#### 1. Sentiment Velocity
- **Rate of Change Tracking** - Monitor how quickly sentiment is shifting
- **Trend Detection** - Identify strong positive/negative momentum
- **Alert System** - Highlights when sentiment changes exceed thresholds

#### 2. Emotion Analysis
- **7-Dimension Emotion Detection** - Beyond simple positive/negative
  - Joy
  - Trust
  - Anticipation
  - Surprise
  - Anger
  - Fear
  - Sadness
- **Radar Chart Visualization** - See emotion distribution at a glance

#### 3. Platform Breakdown
- **Multi-Source Tracking** - Sentiment from News, Reddit, Twitter, and Job platforms
- **Volume Metrics** - Track mention frequency per platform
- **Confidence Scores** - AI certainty levels for each platform

#### 4. Engagement Metrics
- **Total Volume** - Daily mention counts
- **Average Confidence** - Overall AI prediction confidence
- **Peak Activity Times** - Identify when engagement is highest

#### 5. Stock Performance Integration
- **Real-time Price Data** - Current stock price with daily changes
- **High/Low Tracking** - Daily trading range
- **Volume Statistics** - Trading volume metrics
- **Change Indicators** - Visual trend indicators (up/down)

#### 6. News Aggregation
- **Latest Headlines** - Real-time news about tracked companies
- **Sentiment Scoring** - Individual article sentiment analysis
- **Source Attribution** - Track which outlets are covering the company
- **Confidence Ratings** - How certain the AI is about each article's sentiment

#### 7. Job Postings Analysis
- **Open Position Tracking** - Monitor current job listings
- **Sentiment by Role** - How different positions are perceived
- **Location Data** - Geographic distribution of opportunities
- **Type Filtering** - Engineering, Product, Design categories

### Design Features

#### Dark Mode First
- Modern, sleek dark theme optimized for extended viewing
- Reduced eye strain with carefully chosen color palette
- High contrast for excellent readability

#### Responsive Design
- **Mobile Optimized** - Works beautifully on phones (320px+)
- **Tablet Friendly** - Adaptive layouts for tablets
- **Desktop Enhanced** - Multi-column grid layouts for large screens
- **Flexible Components** - All charts and cards resize smoothly

#### Visual Enhancements
- **Gradient Accents** - Eye-catching color gradients for headers
- **Smooth Animations** - Fade-in effects and transitions
- **Live Indicators** - Pulsing dots for real-time mode
- **Color-Coded Metrics** - Instant visual feedback (green/yellow/red)
- **Interactive Charts** - Hover tooltips and legends
- **Custom Scrollbars** - Styled thin scrollbars for lists

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom dark theme
- **Charts**: Recharts (Area, Radar, Bar charts)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Sentiment Analysis**: Sentiment.js library

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

### Selecting Companies
Click on any company button in the header to switch between tracked companies.

### Changing Time Range
Use the time range buttons (1W, 1M, 3M, 6M, 1Y) on the sentiment trend chart to adjust the historical view.

### Live vs Demo Mode
Toggle the "Live" button to switch between real API data (when configured) and demo data.

### Refreshing Data
Click the "Refresh" button to reload all data from sources.

### Exporting Data
Click the "Export" button to download a JSON file with all current metrics and data points.

## Dashboard Sections

### 1. Overall Sentiment Card
- Current sentiment score (0-100)
- Change from previous period
- Employee vs External breakdown
- Color-coded indicators

### 2. Sentiment Velocity Card
- Rate of change (points per day)
- Trend analysis
- Momentum indicators
- Alert messages for significant changes

### 3. Stock Performance Card
- Current stock price
- Daily change ($ and %)
- High/Low range
- Visual trend indicators

### 4. Sentiment Trends Chart
- Historical data visualization
- Three lines: Overall, Employee, External
- Interactive tooltips
- Time range selector

### 5. Engagement Metrics Card
- Total mention volume
- Average confidence score
- Peak activity times
- Visual progress bars

### 6. Emotion Analysis Chart
- Radar chart with 7 emotions
- Relative emotion strengths
- Interactive tooltips

### 7. Platform Breakdown Card
- Sentiment by source platform
- Volume per platform
- Confidence scores
- Visual progress bars

### 8. Latest News Section
- Recent news articles
- Individual sentiment scores
- Source and timestamp
- Confidence ratings
- Color-coded by sentiment

### 9. Job Postings Section
- Current open positions
- Sentiment scores per job
- Location and type
- Category tags

## Color Coding

- **Green (70-100)**: Positive sentiment
- **Yellow (50-69)**: Neutral sentiment
- **Red (0-49)**: Negative sentiment

## API Integration

The dashboard is designed to work with three free APIs:

1. **NewsAPI** - News articles (100 requests/day free)
2. **Reddit API** - Community discussions (unlimited free)
3. **RemoteOK** - Job postings (unlimited, no key required)

Configure API keys in environment variables:
```bash
VITE_NEWS_API_KEY=your_key_here
VITE_REDDIT_CLIENT_ID=your_id_here
VITE_REDDIT_CLIENT_SECRET=your_secret_here
```

## Deployment

### Netlify (Recommended)
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Vercel
1. Import your GitHub repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### Other Platforms
Build the project with `npm run build` and deploy the `dist` folder to any static hosting service.

## Enhancements Over Original

This project builds on the original sentiment tracker with these key improvements:

1. **Sentiment Velocity** - New metric for rate of change
2. **Emotion Breakdown** - 7-dimension emotion radar chart
3. **Enhanced Engagement Metrics** - Volume, confidence, and timing
4. **Platform Distribution** - Visual breakdown by source
5. **Improved Visual Design** - Modern dark theme with gradients
6. **Better Responsive Layout** - Optimized grid system
7. **Live Indicators** - Visual cues for real-time mode
8. **Confidence Scores** - AI certainty visualization
9. **Peak Activity Tracking** - Time-based engagement patterns
10. **Refined Chart Styles** - Better tooltips and legends

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Fast initial load with Vite
- Optimized bundle size
- Efficient chart rendering with Recharts
- Smooth animations with CSS
- Lazy loading for optimal performance

## Contributing

This is an enhanced version of the sentiment tracking dashboard. Feel free to:
- Report issues
- Suggest features
- Submit pull requests
- Fork and customize

## License

MIT License - feel free to use for personal or commercial projects.

## Credits

Built with modern web technologies and inspired by the need for comprehensive brand sentiment analysis tools.

---

**Made with React, TypeScript, and Tailwind CSS**
