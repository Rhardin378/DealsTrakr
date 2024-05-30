import React, { useEffect, useState } from 'react';
import { fetchDashboardDealData } from '../components/FetchDashboardDealData';
import { PieChart } from 'react-minimal-pie-chart';
import { Sparklines, SparklinesBars } from 'react-sparklines';
import '../../app/styles.css';

const DashboardView = () => {
  const [averageDealAmount, setAverageDealAmount] = useState(null);
  const [closedWonPercentage, setClosedWonPercentage] = useState(null);
  const [closedLostPercentage, setClosedLostPercentage] = useState(null);
  const [averageTimeToClose, setAverageTimeToClose] = useState(null);
  const [averageDealsByDate, setAverageDealsByDate] = useState(null);
  const [dealsByDate, setDealsByDate] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(null);
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
        <div className="dashboard-card">
          <div className="bar-graph-container">
            <h5>Deals by Date Initiated</h5>
            <div className="sparklines-container">
              <Sparklines data={dealsByDate} height={100}>
                <SparklinesBars style={{ fill: "#41c3f9", fillOpacity: "1" }} />
              </Sparklines>
            </div>
            <strong>{averageDealsByDate}</strong> deals per date initiated
          </div>
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
