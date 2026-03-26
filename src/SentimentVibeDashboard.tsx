import { useState, useEffect } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  AlertCircle,
  Users,
  Briefcase,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  BarChart3,
  Download,
  RefreshCw,
  Radio,
  Home,
  Settings,
  Newspaper,
  ChevronRight,
  Search,
  Bell,
  ExternalLink,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
  url: string
  author: string
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

const NAV_ITEMS = [
  { icon: Home, label: 'Home', active: true },
  { icon: Activity, label: 'Analytics', active: false },
  { icon: Newspaper, label: 'News Feed', active: false },
  { icon: Briefcase, label: 'Jobs', active: false },
  { icon: Settings, label: 'Settings', active: false },
]

const SentimentVibeDashboard = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company>(COMPANIES[0])
  const [timeRange, setTimeRange] = useState<'1W' | '1M' | '3M' | '6M' | '1Y'>('1M')
  const [isLiveMode, setIsLiveMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeNav, setActiveNav] = useState('Home')

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
    { title: `${selectedCompany.name} announces new AI initiative to transform enterprise workflows`, sentiment: 85, source: 'TechCrunch', timestamp: '2h ago', confidence: 92, url: '#', author: 'Sarah Chen' },
    { title: `Q4 earnings beat expectations for ${selectedCompany.ticker} amid strong growth`, sentiment: 78, source: 'Bloomberg', timestamp: '5h ago', confidence: 88, url: '#', author: 'Michael Torres' },
    { title: `${selectedCompany.name} faces regulatory scrutiny in European markets`, sentiment: 35, source: 'Reuters', timestamp: '8h ago', confidence: 95, url: '#', author: 'Anna Schmidt' },
    { title: `New product launch receives mixed reviews from industry analysts`, sentiment: 62, source: 'The Verge', timestamp: '1d ago', confidence: 76, url: '#', author: 'David Park' },
    { title: `${selectedCompany.name} expands into emerging markets with strategic partnerships`, sentiment: 72, source: 'Wall Street Journal', timestamp: '1d ago', confidence: 84, url: '#', author: 'James Liu' },
    { title: `${selectedCompany.name} opens new research lab focused on sustainability tech`, sentiment: 80, source: 'Ars Technica', timestamp: '2d ago', confidence: 79, url: '#', author: 'Priya Mehta' },
    { title: `Industry analysts upgrade ${selectedCompany.ticker} stock rating to outperform`, sentiment: 88, source: 'MarketWatch', timestamp: '2d ago', confidence: 91, url: '#', author: 'Robert Chang' },
    { title: `${selectedCompany.name} workforce restructuring raises concerns among employees`, sentiment: 40, source: 'Business Insider', timestamp: '3d ago', confidence: 82, url: '#', author: 'Emily Foster' },
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

  const PLATFORM_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']

  const getSentimentColor = (value: number) => {
    if (value >= 70) return 'text-emerald-600'
    if (value >= 50) return 'text-amber-600'
    return 'text-red-500'
  }

  const getSentimentBg = (value: number) => {
    if (value >= 70) return 'bg-emerald-50 border-emerald-200'
    if (value >= 50) return 'bg-amber-50 border-amber-200'
    return 'bg-red-50 border-red-200'
  }

  const getSentimentDot = (value: number) => {
    if (value >= 70) return 'bg-emerald-500'
    if (value >= 50) return 'bg-amber-500'
    return 'bg-red-500'
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
    <div className="min-h-screen bg-surface-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-surface-300 flex flex-col justify-between min-h-screen sticky top-0">
        <div>
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-7 h-7 text-gray-800" />
              <span className="font-bold text-lg text-gray-800">SentimentVibe</span>
            </div>
          </div>
          <nav className="px-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeNav === item.label
                    ? 'bg-surface-100 text-gray-900'
                    : 'text-gray-500 hover:bg-surface-50 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </div>
                {activeNav === item.label && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top Header */}
        <header className="bg-white border-b border-surface-300 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="p-2 hover:bg-surface-100 rounded-lg transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={exportData}
              className="p-2 hover:bg-surface-100 rounded-lg transition-all"
            >
              <Download className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-surface-100 rounded-lg transition-all">
              <Search className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-surface-100 rounded-lg transition-all relative">
              <Bell className="w-5 h-5 text-gray-500" />
            </button>
            <button
              onClick={() => setIsLiveMode(!isLiveMode)}
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                isLiveMode ? 'bg-emerald-500 text-white' : 'bg-surface-200 text-gray-600 hover:bg-surface-300'
              }`}
            >
              <Radio className={`w-4 h-4 ${isLiveMode ? 'animate-pulse' : ''}`} />
              {isLiveMode ? 'Live' : 'Demo'}
            </button>
          </div>
        </header>

        <div className="p-6 lg:p-8">
          {/* Company Selector */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
            {COMPANIES.map((company) => (
              <button
                key={company.id}
                onClick={() => setSelectedCompany(company)}
                className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  selectedCompany.id === company.id
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-surface-200 border border-surface-300'
                }`}
              >
                {company.name} ({company.ticker})
              </button>
            ))}
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Sentiment Score Card */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-surface-300 shadow-sm animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                  Sentiment Score
                  <ChevronRight className="w-4 h-4" />
                </div>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
                  className="px-3 py-1.5 border border-surface-300 rounded-lg text-sm text-gray-600 bg-white"
                >
                  <option value="1W">1 Week</option>
                  <option value="1M">1 Month</option>
                  <option value="3M">3 Months</option>
                  <option value="6M">6 Months</option>
                  <option value="1Y">All time</option>
                </select>
              </div>
              <div className="flex items-end gap-3 mb-6">
                <span className="text-5xl font-bold text-gray-900">
                  {currentSentiment.overall}
                </span>
                <span className="text-4xl font-light text-gray-300">/100</span>
                <div className="flex items-center gap-1 mb-2 ml-2">
                  {sentimentChange > 0 ? (
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                  <span className={`text-sm font-semibold ${sentimentChange > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {Math.abs(sentimentChange).toFixed(1)} pts
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={sentimentHistory}>
                  <defs>
                    <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="timestamp" stroke="#d1d5db" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <YAxis stroke="#d1d5db" tick={{ fill: '#9ca3af', fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                    labelStyle={{ color: '#6b7280' }}
                  />
                  <Area type="monotone" dataKey="overall" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorOverall)" name="Overall" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Right Column - Velocity & Stock */}
            <div className="lg:col-span-4 space-y-5">
              {/* Sentiment Velocity */}
              <div className="bg-white rounded-2xl p-6 border border-surface-300 shadow-sm animate-fade-in">
                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-3">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Sentiment Velocity
                </div>
                <div className="flex items-end gap-2 mb-2">
                  <span className={`text-4xl font-bold ${currentSentiment.velocity > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {currentSentiment.velocity > 0 ? '+' : ''}{currentSentiment.velocity}
                  </span>
                  <span className="text-gray-400 text-lg mb-1">pts/day</span>
                </div>
                <div className="mt-3 p-3 bg-surface-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-3.5 h-3.5 text-blue-500" />
                    <p className="text-xs font-medium text-blue-600">Trend Analysis</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {Math.abs(currentSentiment.velocity) > 5
                      ? currentSentiment.velocity > 0
                        ? 'Strong positive momentum detected'
                        : 'Sharp negative trend - attention needed'
                      : 'Stable sentiment trajectory'}
                  </p>
                </div>
              </div>

              {/* Stock Performance */}
              <div className="bg-white rounded-2xl p-6 border border-surface-300 shadow-sm animate-fade-in">
                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-3">
                  <LineChartIcon className="w-4 h-4 text-emerald-500" />
                  {selectedCompany.ticker}
                </div>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-4xl font-bold text-gray-900">${stockData.price}</span>
                </div>
                <div className="flex items-center gap-1">
                  {stockData.change > 0 ? (
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-semibold ${stockData.change > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {stockData.changePercent > 0 ? '+' : ''}{stockData.changePercent}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-surface-200">
                  <div>
                    <p className="text-xs text-gray-400">High</p>
                    <p className="text-lg font-semibold text-emerald-600">${stockData.high}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Low</p>
                    <p className="text-lg font-semibold text-red-500">${stockData.low}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Breakdown */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-surface-300 shadow-sm animate-fade-in">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-500" />
                  Platform Breakdown
                </h2>
              </div>
              <div className="space-y-5">
                {platformSentiment.map((platform, idx) => (
                  <div key={platform.platform} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{platform.platform}</span>
                      <span className={`text-sm font-bold ${getSentimentColor(platform.sentiment)}`}>
                        {platform.sentiment}/100
                      </span>
                    </div>
                    <div className="w-full bg-surface-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-2.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${platform.sentiment}%`,
                          backgroundColor: PLATFORM_COLORS[idx],
                        }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{platform.volume.toLocaleString()} mentions</span>
                      <span>{platform.confidence}% confidence</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Engagement Metrics */}
              <div className="mt-6 pt-5 border-t border-surface-200 space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Users className="w-4 h-4 text-blue-500" />
                  Engagement
                </div>
                <div className="bg-surface-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Total Volume</p>
                  <p className="text-2xl font-bold text-blue-600">{currentSentiment.volume.toLocaleString()}</p>
                  <p className="text-xs text-gray-400 mt-0.5">mentions today</p>
                </div>
                <div className="bg-surface-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Avg. Confidence</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.round(platformSentiment.reduce((acc, p) => acc + p.confidence, 0) / platformSentiment.length)}%
                  </p>
                  <div className="w-full bg-surface-200 rounded-full h-1.5 mt-2">
                    <div
                      className="bg-purple-500 h-1.5 rounded-full"
                      style={{ width: `${Math.round(platformSentiment.reduce((acc, p) => acc + p.confidence, 0) / platformSentiment.length)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emotion Analysis */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-surface-300 shadow-sm animate-fade-in">
              <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-4">
                <PieChartIcon className="w-4 h-4 text-pink-500" />
                Emotion Analysis
              </h2>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={Object.entries(emotionData).map(([key, value]) => ({
                  emotion: key.charAt(0).toUpperCase() + key.slice(1),
                  value,
                }))}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="emotion" tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <Radar name="Emotion Score" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Employee vs External */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-surface-300 shadow-sm animate-fade-in">
              <h2 className="text-sm font-semibold text-gray-700 mb-5">Sentiment Breakdown</h2>
              <div className="space-y-5">
                <div className="bg-surface-50 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-gray-500">Employee Sentiment</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      currentSentiment.employee >= 70 ? 'bg-emerald-100 text-emerald-700' : currentSentiment.employee >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {currentSentiment.employee >= 70 ? 'Positive' : currentSentiment.employee >= 50 ? 'Neutral' : 'Negative'}
                    </span>
                  </div>
                  <p className={`text-4xl font-bold ${getSentimentColor(currentSentiment.employee)}`}>
                    {currentSentiment.employee}
                  </p>
                  <div className="w-full bg-surface-200 rounded-full h-2 mt-3">
                    <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${currentSentiment.employee}%` }}></div>
                  </div>
                </div>
                <div className="bg-surface-50 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-gray-500">External Sentiment</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      currentSentiment.external >= 70 ? 'bg-emerald-100 text-emerald-700' : currentSentiment.external >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {currentSentiment.external >= 70 ? 'Positive' : currentSentiment.external >= 50 ? 'Neutral' : 'Negative'}
                    </span>
                  </div>
                  <p className={`text-4xl font-bold ${getSentimentColor(currentSentiment.external)}`}>
                    {currentSentiment.external}
                  </p>
                  <div className="w-full bg-surface-200 rounded-full h-2 mt-3">
                    <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${currentSentiment.external}%` }}></div>
                  </div>
                </div>
                <div className="bg-surface-50 rounded-xl p-4 flex items-center justify-between">
                  <p className="text-sm text-gray-500">Peak Activity</p>
                  <p className="text-sm font-semibold text-gray-700">2:00 PM - 4:00 PM EST</p>
                </div>
              </div>
            </div>

            {/* Articles Feed */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-surface-300 shadow-sm animate-fade-in">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-orange-500" />
                  Articles Feed
                </h2>
                <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline flex items-center gap-1">
                  See all <ChevronRight className="w-3 h-3" />
                </span>
              </div>
              <div className="space-y-3 max-h-[480px] overflow-y-auto scrollbar-thin pr-1">
                {newsItems.map((news, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-all hover:shadow-sm ${getSentimentBg(news.sentiment)}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-sm text-gray-800 mb-2 leading-snug">{news.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                          <span className="font-semibold text-gray-700">{news.source}</span>
                          <span className="text-gray-300">|</span>
                          <span>By {news.author}</span>
                          <span className="text-gray-300">|</span>
                          <span>{news.timestamp}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${getSentimentDot(news.sentiment)}`}></div>
                          <span className={`text-sm font-bold ${getSentimentColor(news.sentiment)}`}>
                            {news.sentiment}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">{news.confidence}% conf.</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-black/5">
                      <a href={news.url} className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1 font-medium">
                        Read article <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Postings */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-surface-300 shadow-sm animate-fade-in">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-cyan-500" />
                  Job Postings
                </h2>
                <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline flex items-center gap-1">
                  See all <ChevronRight className="w-3 h-3" />
                </span>
              </div>
              <div className="space-y-3 max-h-[480px] overflow-y-auto scrollbar-thin">
                {jobPostings.map((job, idx) => (
                  <div key={idx} className="p-4 bg-surface-50 rounded-xl border border-surface-200 hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-800">{job.title}</p>
                        <p className="text-xs text-gray-400 mt-1">{job.location}</p>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          job.sentiment >= 75 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {job.sentiment}
                      </span>
                    </div>
                    <span className="inline-block px-2.5 py-1 bg-white border border-surface-300 rounded-full text-xs text-gray-500 font-medium">{job.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SentimentVibeDashboard
