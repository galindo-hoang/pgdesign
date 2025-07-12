import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Smartphone, 
  Monitor,
  Globe,
  RefreshCw
} from 'lucide-react';
import './AnalyticsPage.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AnalyticsData {
  visitors: {
    total: number;
    unique: number;
    returning: number;
    bounceRate: number;
    avgSessionDuration: string;
    pageViews: number;
  };
  visitorTrend: {
    labels: string[];
    data: number[];
  };
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  topPages: Array<{
    page: string;
    views: number;
    percentage: number;
  }>;
  trafficSources: Array<{
    source: string;
    visitors: number;
    percentage: number;
  }>;
  hourlyTraffic: {
    labels: string[];
    data: number[];
  };
}

const AnalyticsPage: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7days');

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockData: AnalyticsData = {
        visitors: {
          total: 15847,
          unique: 12340,
          returning: 3507,
          bounceRate: 42.3,
          avgSessionDuration: '3m 24s',
          pageViews: 23580
        },
        visitorTrend: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: [1200, 1450, 1650, 1400, 1800, 2100, 1950]
        },
        deviceStats: {
          desktop: 45,
          mobile: 48,
          tablet: 7
        },
        topPages: [
          { page: '/homepage', views: 8450, percentage: 35.8 },
          { page: '/projects', views: 5230, percentage: 22.2 },
          { page: '/blog', views: 3890, percentage: 16.5 },
          { page: '/services', views: 2740, percentage: 11.6 },
          { page: '/intro', views: 1870, percentage: 7.9 },
          { page: '/contact', views: 1400, percentage: 5.9 }
        ],
        trafficSources: [
          { source: 'Direct', visitors: 6200, percentage: 39.1 },
          { source: 'Google Search', visitors: 5100, percentage: 32.2 },
          { source: 'Social Media', visitors: 2400, percentage: 15.1 },
          { source: 'Referral', visitors: 1500, percentage: 9.5 },
          { source: 'Email', visitors: 647, percentage: 4.1 }
        ],
        hourlyTraffic: {
          labels: ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'],
          data: [120, 80, 60, 90, 200, 350, 450, 380, 420, 500, 380, 250]
        }
      };
      
      setAnalyticsData(mockData);
      setLoading(false);
    };

    fetchAnalyticsData();
  }, [timeRange]);

  const visitorTrendChartData = {
    labels: analyticsData?.visitorTrend.labels || [],
    datasets: [
      {
        label: 'Visitors',
        data: analyticsData?.visitorTrend.data || [],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const deviceStatsChartData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: analyticsData ? [
          analyticsData.deviceStats.desktop,
          analyticsData.deviceStats.mobile,
          analyticsData.deviceStats.tablet
        ] : [],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  };

  const hourlyTrafficChartData = {
    labels: analyticsData?.hourlyTraffic.labels || [],
    datasets: [
      {
        label: 'Visitors',
        data: analyticsData?.hourlyTraffic.data || [],
        backgroundColor: '#8b5cf6',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="analytics-page">
        <div className="analytics-loading">
          <div className="loading-spinner"></div>
          <p>Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="analytics-page">
        <div className="analytics-error">
          <p>Failed to load analytics data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      {/* Header */}
      <div className="analytics-header">
        <div>
          <h1>Analytics Dashboard</h1>
          <p>Track your website performance and visitor behavior</p>
        </div>
        <div className="analytics-controls">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-select"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 3 months</option>
            <option value="1year">Last year</option>
          </select>
          <button className="refresh-btn">
            <RefreshCw />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">
            <Users />
          </div>
          <div className="metric-content">
            <h3>Total Visitors</h3>
            <div className="metric-number">{analyticsData.visitors.total.toLocaleString()}</div>
            <div className="metric-change positive">+12.5% from last period</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <Eye />
          </div>
          <div className="metric-content">
            <h3>Page Views</h3>
            <div className="metric-number">{analyticsData.visitors.pageViews.toLocaleString()}</div>
            <div className="metric-change positive">+8.3% from last period</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <Clock />
          </div>
          <div className="metric-content">
            <h3>Avg. Session Duration</h3>
            <div className="metric-number">{analyticsData.visitors.avgSessionDuration}</div>
            <div className="metric-change negative">-2.1% from last period</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <TrendingUp />
          </div>
          <div className="metric-content">
            <h3>Bounce Rate</h3>
            <div className="metric-number">{analyticsData.visitors.bounceRate}%</div>
            <div className="metric-change negative">+1.2% from last period</div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Visitor Trend */}
        <div className="chart-card large">
          <div className="chart-header">
            <h3>Visitor Trend</h3>
            <p>Daily visitors over the selected period</p>
          </div>
          <div className="chart-container">
            <Line data={visitorTrendChartData} options={chartOptions} />
          </div>
        </div>

        {/* Device Stats */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Device Types</h3>
            <p>Visitor distribution by device</p>
          </div>
          <div className="chart-container">
            <Doughnut data={deviceStatsChartData} options={doughnutOptions} />
          </div>
        </div>

        {/* Hourly Traffic */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Hourly Traffic</h3>
            <p>Average visitors by hour</p>
          </div>
          <div className="chart-container">
            <Bar data={hourlyTrafficChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Data Tables */}
      <div className="tables-grid">
        {/* Top Pages */}
        <div className="table-card">
          <div className="table-header">
            <h3>Top Pages</h3>
            <p>Most visited pages</p>
          </div>
          <div className="table-content">
            {analyticsData.topPages.map((page, index) => (
              <div key={index} className="table-row">
                <div className="page-info">
                  <span className="page-name">{page.page}</span>
                  <span className="page-views">{page.views.toLocaleString()} views</span>
                </div>
                <div className="page-percentage">{page.percentage}%</div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${page.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="table-card">
          <div className="table-header">
            <h3>Traffic Sources</h3>
            <p>Where your visitors come from</p>
          </div>
          <div className="table-content">
            {analyticsData.trafficSources.map((source, index) => (
              <div key={index} className="table-row">
                <div className="source-info">
                  <div className="source-icon">
                    {source.source === 'Direct' && <Globe />}
                    {source.source === 'Google Search' && <Globe />}
                    {source.source === 'Social Media' && <Users />}
                    {source.source === 'Referral' && <Globe />}
                    {source.source === 'Email' && <Globe />}
                  </div>
                  <div>
                    <span className="source-name">{source.source}</span>
                    <span className="source-visitors">{source.visitors.toLocaleString()} visitors</span>
                  </div>
                </div>
                <div className="source-percentage">{source.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage; 