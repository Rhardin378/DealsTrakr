import React, { useEffect, useState } from 'react';
import { fetchDashboardDealData } from '../components/FetchDashboardDealData';
import { PieChart } from 'react-minimal-pie-chart';
import { Sparklines, SparklinesBars } from 'react-sparklines';
import '../../app/styles.css'; // Import the stylesheet

const DashboardView = () => {
  const [averageDealAmount, setAverageDealAmount] = useState(null);
  const [closedWonPercentage, setClosedWonPercentage] = useState(null);
  const [closedLostPercentage, setClosedLostPercentage] = useState(null);
  const [averageTimeToClose, setAverageTimeToClose] = useState(null);
  const [averageDealsByDate, setAverageDealsByDate] = useState(null);
  const [dealsByDate, setDealsByDate] = useState([]);
  const [numberOfDates, setNumberOfDates] = useState(null);
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
        setDealsByDate(Object.values(data.dealsByDate));
        setNumberOfDates(data.numberOfDates);
        console.log(data)
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
        <div className="dashboard-card combined-card">
          <div className="text-card">
            <h4>Average Time to Close</h4>
            <p>{averageTimeToClose} days</p>
          </div>
          <div className="pie-chart-container">
            <PieChart
              className='pie-chart'
              data={[
                { title: 'Closed Won', value: closedWonPercentageAsNumber, color: '#E38627' },
                { title: 'Closed Lost', value: closedLostPercentageAsNumber, color: '#C13C37' }
              ]}
              radius={50}
              viewBoxSize={[100, 100]}
              label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}%`}
              labelPosition={60}
              paddingAngle={0}
              labelStyle={{
                fontSize: '6.5px',
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                strokeWidth: '1'
              }}
            />
          </div>
        </div>
        <div className="dashboard-card combined-card">
          <div className="bar-graph-container">
            <h4>Deals by Date Initiated</h4>
            <div className="sparklines-container">
              <Sparklines data={dealsByDate} height={150}>
                <SparklinesBars style={{ fill: "#41c3f9", fillOpacity: "1" }} />
              </Sparklines>
            </div>
            <p><strong>{averageDealsByDate}</strong> deals per date initiated</p>
          </div>
          <div className="text-card">
            <h4>Average Deal Amount</h4>
            <p>${averageDealAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
