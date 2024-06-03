import React, { useEffect, useState } from 'react';
import { fetchDashboardDealData } from '../components/FetchDashboardDealData';
import { PieChart } from 'react-minimal-pie-chart';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import '../../app/styles.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardView = () => {
  const [averageDealAmount, setAverageDealAmount] = useState(null);
  const [closedWonPercentage, setClosedWonPercentage] = useState(null);
  const [closedLostPercentage, setClosedLostPercentage] = useState(null);
  const [averageTimeToClose, setAverageTimeToClose] = useState(null);
  const [averageDealsByDate, setAverageDealsByDate] = useState(null);
  const [dealsByDate, setDealsByDate] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(null);
  const [revenueByMonth, setRevenueByMonth] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDealData = async () => {
      try {
        const data = await fetchDashboardDealData();
        setAverageDealAmount(data.averageDealAmount);
        setClosedWonPercentage(data.closedWonPercentage);
        setClosedLostPercentage(data.closedLostPercentage);
        setAverageTimeToClose(data.averageTimeToClose);
        setAverageDealsByDate(data.averageDealsByDate);
        setTotalEarnings(data.totalEarnings);
        setDealsByDate(Object.values(data.dealsByDate));

        const revenueByMonth = data.deals.reduce((acc, deal) => {
          const date = new Date(deal.dateClosed);
          const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
          acc[monthYear] = (acc[monthYear] || 0) + parseFloat(deal.amount);
          return acc;
        }, {});

        // Sort revenueByMonth by date
        const sortedRevenueByMonth = Object.entries(revenueByMonth)
          .sort((a, b) => new Date(a[0]) - new Date(b[0]))
          .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {});

        setRevenueByMonth(sortedRevenueByMonth);
      } catch (error) {
        setError('Error fetching the average deal amount.');
      } finally {
        setLoading(false);
      }
    };

    fetchDealData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const closedWonPercentageAsNumber = parseInt(closedWonPercentage, 10);
  const closedLostPercentageAsNumber = parseInt(closedLostPercentage, 10);

  const barData = {
    labels: Object.keys(revenueByMonth),
    datasets: [
      {
        label: '= Monthly Revenue',
        data: Object.values(revenueByMonth),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  

  const barOptions = {
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        padding: {
          bottom: 10
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  const highestRevenueMonth = Object.entries(revenueByMonth)
  .reduce((prev, [month, revenue]) => {
    return prev[1] > revenue ? prev : [month, revenue];
  }, ['', 0]);

  const formattedRevenue = highestRevenueMonth[1].toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });

  return (
  <div className="dashboard-container">
    <div className="chart-container">
      <div className="dashboard-card">
        <h5>Total Revenue</h5>
        <p>${totalEarnings}</p>
      </div>
      <div className="dashboard-card">
        <h5>Average Time to Close</h5>
        <p>{averageTimeToClose} days</p>
      </div>
      <div className="dashboard-card">
        <h5>Win Percentage</h5>
        <div className="pie-chart-container">
          <div className="chart-with-legend">
            <PieChart
              className="pie-chart"
              data={[
                { title: 'Closed Won', value: closedWonPercentageAsNumber, color: '#E38627' },
                { title: 'Closed Lost', value: closedLostPercentageAsNumber, color: '#C13C37' }
              ]}
              radius={50}
              viewBoxSize={[100, 100]}
            />
            <div className="legend">
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#E38627' }}></span>
                Closed Won: {closedWonPercentageAsNumber}%
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#C13C37' }}></span>
                Closed Lost: {closedLostPercentageAsNumber}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="bar-graph-container">
          <h5>Revenue by Month</h5>
          <div className="bar-chart-container">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
      <div className="dashboard-card">
        <h5>Highest Total Month by Revenue</h5>
        <p>{highestRevenueMonth[0]}: ${formattedRevenue}</p>
      </div>
      <div className="dashboard-card">
        <h5>Average Deal Amount</h5>
        <p>${averageDealAmount}</p>
      </div>
    </div>
  </div>
);
};

export default DashboardView;
