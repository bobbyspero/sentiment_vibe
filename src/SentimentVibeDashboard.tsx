import { useState, useEffect } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  AlertCircle,
  Users,
  MessageSquare,
  Briefcase,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  BarChart3,
  Download,
  RefreshCw,
  Radio,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'

// Types
interface Company {
  id: string
  name: string
  ticker: string
}

interface SentimentData {
  timestamp: string
  overall: number
  employee: number
  external: number
  velocity: number
  volume: number
}

interface EmotionData {
  joy: number
  trust: number
  anticipation: number
  surprise: number
  anger: number
  fear: number
  sadness: number
}

interface PlatformSentiment {
  platform: string
  sentiment: number
  volume: number
  confidence: number
}

interface NewsItem {
  title: string
  sentiment: number
  source: string
  timestamp: string
  confidence: number
}

interface JobPosting {
  title: string
  type: string
  location: string
  sentiment: number
}

interface StockData {
  price: number
  change: number
  changePercent: number
  high: number
  low: number
  volume: number
}

// Company data
const COMPANIES: Company[] = [
  { id: 'meta', name: 'Meta', ticker: 'META' },
  { id: 'google', name: 'Google', ticker: 'GOOGL' },
  { id: 'apple', name: 'Apple', ticker: 'AAPL' },
  { id: 'amazon', name: 'Amazon', ticker: 'AMZN' },
  { id: 'microsoft', name: 'Microsoft', ticker: 'MSFT' },
  { id: 'tesla', name: 'Tesla', ticker: 'TSLA' },
]

const SentimentVibeDashboard = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company>(COMPANIES[0])
  const [timeRange, setTimeRange] = useState<'1W' | '1M' | '3M' | '6M' | '1Y'>('1M')
  const [isLiveMode, setIsLiveMode] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock data generators
  const generateSentimentHistory = (): SentimentData[] => {
    const days = timeRange === '1W' ? 7 : timeRange === '1M' ? 30 : timeRange === '3M' ? 90 : timeRange === '6M' ? 180 : 365
    return Array.from({ length: days }, (_, i) => {
      const baseValue = 60 + Math.random() * 20
      const velocity = (Math.random() - 0.5) * 10
      return {
        timestamp: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        overall: Math.round(baseValue + Math.sin(i / 5) * 10),
        employee: Math.round(baseValue + Math.cos(i / 7) * 8),
        external: Math.round(baseValue + Math.sin(i / 6) * 12),
        velocity: Math.round(velocity * 10) / 10,
        volume: Math.round(1000 + Math.random() * 5000),
      }
    })
  }

  const generateEmotionData = (): EmotionData => ({
    joy: Math.round(40 + Math.random() * 30),
    trust: Math.round(35 + Math.random() * 25),
    anticipation: Math.round(30 + Math.random() * 20),
    surprise: Math.round(15 + Math.random() * 15),
    anger: Math.round(10 + Math.random() * 15),
    fear: Math.round(8 + Math.random() * 12),
    sadness: Math.round(5 + Math.random() * 10),
  })

  const generatePlatformSentiment = (): PlatformSentiment[] => [
    { platform: 'News', sentiment: Math.round(60 + Math.random() * 20), volume: Math.round(1000 + Math.random() * 2000), confidence: Math.round(75 + Math.random() * 20) },
    { platform: 'Reddit', sentiment: Math.round(55 + Math.random() * 25), volume: Math.round(2000 + Math.random() * 3000), confidence: Math.round(70 + Math.random() * 25) },
    { platform: 'Twitter', sentiment: Math.round(50 + Math.random() * 30), volume: Math.round(5000 + Math.random() * 5000), confidence: Math.round(65 + Math.random() * 25) },
    { platform: 'Jobs', sentiment: Math.round(70 + Math.random() * 15), volume: Math.round(500 + Math.random() * 500), confidence: Math.round(80 + Math.random() * 15) },
  ]

  const generateNewsItems = (): NewsItem[] => [
    { title: `${selectedCompany.name} announces new AI initiative`, sentiment: 85, source: 'TechCrunch', timestamp: '2h ago', confidence: 92 },
    { title: `Q4 earnings beat expectations for ${selectedCompany.ticker}`, sentiment: 78, source: 'Bloomberg', timestamp: '5h ago', confidence: 88 },
    { title: `${selectedCompany.name} faces regulatory scrutiny`, sentiment: 35, source: 'Reuters', timestamp: '8h ago', confidence: 95 },
    { title: `New product launch receives mixed reviews`, sentiment: 62, source: 'The Verge', timestamp: '1d ago', confidence: 76 },
    { title: `${selectedCompany.name} expands into emerging markets`, sentiment: 72, source: 'WSJ', timestamp: '1d ago', confidence: 84 },
  ]

  const generateJobPostings = (): JobPosting[] => [
    { title: 'Senior Software Engineer', type: 'Engineering', location: 'San Francisco, CA', sentiment: 75 },
    { title: 'Product Manager', type: 'Product', location: 'Seattle, WA', sentiment: 80 },
    { title: 'UX Designer', type: 'Design', location: 'New York, NY', sentiment: 78 },
    { title: 'Data Scientist', type: 'Engineering', location: 'Austin, TX', sentiment: 82 },
    { title: 'DevOps Engineer', type: 'Engineering', location: 'Remote', sentiment: 77 },
  ]

  const generateStockData = (): StockData => {
    const price = 150 + Math.random() * 200
    const change = (Math.random() - 0.5) * 10
    return {
      price: Math.round(price * 100) / 100,
      change: Math.round(change * 100) / 100,
      changePercent: Math.round((change / price) * 10000) / 100,
      high: Math.round((price + Math.abs(change) * 1.5) * 100) / 100,
      low: Math.round((price - Math.abs(change) * 1.5) * 100) / 100,
      volume: Math.round(10000000 + Math.random() * 50000000),
    }
  }

  const [sentimentHistory, setSentimentHistory] = useState<SentimentData[]>(generateSentimentHistory())
  const [emotionData, setEmotionData] = useState<EmotionData>(generateEmotionData())
  const [platformSentiment, setPlatformSentiment] = useState<PlatformSentiment[]>(generatePlatformSentiment())
  const [newsItems, setNewsItems] = useState<NewsItem[]>(generateNewsItems())
  const [jobPostings, setJobPostings] = useState<JobPosting[]>(generateJobPostings())
  const [stockData, setStockData] = useState<StockData>(generateStockData())

  useEffect(() => {
    setSentimentHistory(generateSentimentHistory())
    setEmotionData(generateEmotionData())
    setPlatformSentiment(generatePlatformSentiment())
    setNewsItems(generateNewsItems())
    setJobPostings(generateJobPostings())
    setStockData(generateStockData())
  }, [selectedCompany, timeRange])

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setSentimentHistory(generateSentimentHistory())
      setEmotionData(generateEmotionData())
      setPlatformSentiment(generatePlatformSentiment())
      setNewsItems(generateNewsItems())
      setJobPostings(generateJobPostings())
      setStockData(generateStockData())
      setLoading(false)
    }, 1000)
  }

  const currentSentiment = sentimentHistory[sentimentHistory.length - 1]
  const previousSentiment = sentimentHistory[sentimentHistory.length - 2]
  const sentimentChange = currentSentiment.overall - previousSentiment.overall

  // Chart colors
  const PLATFORM_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']

  const getSentimentColor = (value: number) => {
    if (value >= 70) return 'text-green-400'
    if (value >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getSentimentBgColor = (value: number) => {
    if (value >= 70) return 'bg-green-500/20 border-green-500/50'
    if (value >= 50) return 'bg-yellow-500/20 border-yellow-500/50'
    return 'bg-red-500/20 border-red-500/50'
  }

  const exportData = () => {
    const data = {
      company: selectedCompany,
      timestamp: new Date().toISOString(),
      sentimentHistory,
      emotionData,
      platformSentiment,
      newsItems,
      jobPostings,
      stockData,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sentiment-vibe-${selectedCompany.id}-${new Date().toISOString()}.json`
    a.click()
  }

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Sentiment Vibe
            </h1>
            <p className="text-gray-400 mt-1">Advanced Brand Analytics Dashboard</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={exportData}
              className="px-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={() => setIsLiveMode(!isLiveMode)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                isLiveMode ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-dark-700 hover:bg-dark-600'
              }`}
            >
              <Radio className={`w-4 h-4 ${isLiveMode ? 'animate-pulse' : ''}`} />
              {isLiveMode ? 'Live' : 'Demo'}
            </button>
          </div>
        </div>

        {/* Company Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {COMPANIES.map((company) => (
            <button
              key={company.id}
              onClick={() => setSelectedCompany(company)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCompany.id === company.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-dark-700 hover:bg-dark-600 text-gray-300'
              }`}
            >
              {company.name} ({company.ticker})
            </button>
          ))}
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Overall Sentiment Card */}
        <div className="lg:col-span-4 bg-dark-800 rounded-xl p-6 border border-dark-600 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              Overall Sentiment
            </h2>
            {isLiveMode && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>}
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-end gap-2">
                <span className={`text-5xl font-bold ${getSentimentColor(currentSentiment.overall)}`}>
                  {currentSentiment.overall}
                </span>
                <span className="text-gray-400 text-xl mb-2">/100</span>
                <div className="flex items-center gap-1 mb-2">
                  {sentimentChange > 0 ? (
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  )}
                  <span className={sentimentChange > 0 ? 'text-green-400' : 'text-red-400'}>
                    {Math.abs(sentimentChange).toFixed(1)}
                  </span>
                </div>
              </div>
              <p className="text-gray-400 mt-2">Current sentiment score</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-600">
              <div>
                <p className="text-gray-400 text-sm">Employee</p>
                <p className={`text-2xl font-bold ${getSentimentColor(currentSentiment.employee)}`}>
                  {currentSentiment.employee}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">External</p>
                <p className={`text-2xl font-bold ${getSentimentColor(currentSentiment.external)}`}>
                  {currentSentiment.external}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sentiment Velocity */}
        <div className="lg:col-span-4 bg-dark-800 rounded-xl p-6 border border-dark-600 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Sentiment Velocity
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-end gap-2">
                <span className={`text-5xl font-bold ${currentSentiment.velocity > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {currentSentiment.velocity > 0 ? '+' : ''}{currentSentiment.velocity}
                </span>
                <span className="text-gray-400 text-xl mb-2">pts/day</span>
              </div>
              <p className="text-gray-400 mt-2">Rate of sentiment change</p>
            </div>
            <div className="pt-4 border-t border-dark-600">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-purple-400" />
                <p className="text-sm font-medium text-purple-400">Trend Analysis</p>
              </div>
              <p className="text-sm text-gray-400">
                {Math.abs(currentSentiment.velocity) > 5
                  ? currentSentiment.velocity > 0
                    ? 'Strong positive momentum detected'
                    : 'Sharp negative trend - attention needed'
                  : 'Stable sentiment trajectory'}
              </p>
            </div>
          </div>
        </div>

        {/* Stock Data */}
        <div className="lg:col-span-4 bg-dark-800 rounded-xl p-6 border border-dark-600 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <LineChartIcon className="w-5 h-5 text-green-400" />
              Stock Performance
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-gray-100">${stockData.price}</span>
                <div className="flex items-center gap-1 mb-2">
                  {stockData.change > 0 ? (
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  )}
                  <span className={stockData.change > 0 ? 'text-green-400' : 'text-red-400'}>
                    {stockData.changePercent > 0 ? '+' : ''}{stockData.changePercent}%
                  </span>
                </div>
              </div>
              <p className="text-gray-400 mt-2">{selectedCompany.ticker} - Today</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-600">
              <div>
                <p className="text-gray-400 text-sm">High</p>
                <p className="text-xl font-bold text-green-400">${stockData.high}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Low</p>
                <p className="text-xl font-bold text-red-400">${stockData.low}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sentiment Trend Chart */}
        <div className="lg:col-span-8 bg-dark-800 rounded-xl p-6 border border-dark-600 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Sentiment Trends
            </h2>
            <div className="flex gap-2 overflow-x-auto">
              {(['1W', '1M', '3M', '6M', '1Y'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-lg text-sm whitespace-nowrap transition-all ${
                    timeRange === range
                      ? 'bg-purple-500 text-white'
                      : 'bg-dark-700 hover:bg-dark-600 text-gray-300'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={sentimentHistory}>
              <defs>
                <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorEmployee" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExternal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d2d44" />
              <XAxis dataKey="timestamp" stroke="#6b7280" tick={{ fill: '#9ca3af' }} />
              <YAxis stroke="#6b7280" tick={{ fill: '#9ca3af' }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #2d2d44', borderRadius: '8px' }}
                labelStyle={{ color: '#9ca3af' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Area type="monotone" dataKey="overall" stroke="#3b82f6" fillOpacity={1} fill="url(#colorOverall)" name="Overall" />
              <Area type="monotone" dataKey="employee" stroke="#10b981" fillOpacity={1} fill="url(#colorEmployee)" name="Employee" />
              <Area type="monotone" dataKey="external" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorExternal)" name="External" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Metrics */}
        <div className="lg:col-span-4 bg-dark-800 rounded-xl p-6 border border-dark-600 animate-fade-in">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-blue-400" />
            Engagement Metrics
          </h2>
          <div className="space-y-4">
            <div className="bg-dark-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Total Volume</p>
              <p className="text-3xl font-bold text-blue-400">{currentSentiment.volume.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">mentions today</p>
            </div>
            <div className="bg-dark-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Avg. Confidence</p>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-purple-400">
                  {Math.round(platformSentiment.reduce((acc, p) => acc + p.confidence, 0) / platformSentiment.length)}%
                </p>
              </div>
              <div className="w-full bg-dark-600 rounded-full h-2 mt-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${Math.round(platformSentiment.reduce((acc, p) => acc + p.confidence, 0) / platformSentiment.length)}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-dark-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Peak Activity</p>
              <p className="text-2xl font-bold text-green-400">2:00 PM - 4:00 PM</p>
              <p className="text-xs text-gray-500 mt-1">EST</p>
            </div>
          </div>
        </div>

        {/* Emotion Radar Chart */}
        <div className="lg:col-span-6 bg-dark-800 rounded-xl p-6 border border-dark-600 animate-fade-in">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
            <PieChartIcon className="w-5 h-5 text-pink-400" />
            Emotion Analysis
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={Object.entries(emotionData).map(([key, value]) => ({
              emotion: key.charAt(0).toUpperCase() + key.slice(1),
              value,
            }))}>
              <PolarGrid stroke="#2d2d44" />
              <PolarAngleAxis dataKey="emotion" tick={{ fill: '#9ca3af' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af' }} />
              <Radar name="Emotion Score" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #2d2d44', borderRadius: '8px' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Distribution */}
        <div className="lg:col-span-6 bg-dark-800 rounded-xl p-6 border border-dark-600 animate-fade-in">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-green-400" />
            Platform Breakdown
          </h2>
          <div className="space-y-4">
            {platformSentiment.map((platform, idx) => (
              <div key={platform.platform} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300">{platform.platform}</span>
                  <span className={`text-sm font-bold ${getSentimentColor(platform.sentiment)}`}>
                    {platform.sentiment}/100
                  </span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${platform.sentiment}%`,
                      backgroundColor: PLATFORM_COLORS[idx],
                    }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{platform.volume.toLocaleString()} mentions</span>
                  <span>{platform.confidence}% confidence</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest News */}
        <div className="lg:col-span-6 bg-dark-800 rounded-xl p-6 border border-dark-600 animate-fade-in">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-orange-400" />
            Latest News
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin">
            {newsItems.map((news, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${getSentimentBgColor(news.sentiment)}`}
              >
                <p className="font-medium text-sm mb-2">{news.title}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{news.source}</span>
                  <span>{news.timestamp}</span>
                </div>
                <div className="flex items-center gap-4 mt-2 pt-2 border-t border-dark-600">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">Sentiment:</span>
                    <span className={`text-xs font-bold ${getSentimentColor(news.sentiment)}`}>
                      {news.sentiment}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">Confidence:</span>
                    <span className="text-xs font-bold text-purple-400">{news.confidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Postings */}
        <div className="lg:col-span-6 bg-dark-800 rounded-xl p-6 border border-dark-600 animate-fade-in">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            Job Postings Sentiment
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin">
            {jobPostings.map((job, idx) => (
              <div key={idx} className="p-4 bg-dark-700 rounded-lg border border-dark-600">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{job.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{job.location}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      job.sentiment >= 75 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {job.sentiment}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-dark-600 rounded text-xs text-gray-300">{job.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SentimentVibeDashboard
