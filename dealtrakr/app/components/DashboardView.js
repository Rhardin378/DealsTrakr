import React, { useEffect, useState } from 'react';
import { fetchDashboardDealData } from '../components/FetchDashboardDealData';
import { PieChart } from 'react-minimal-pie-chart';
import '../../app/styles.css'; // Import the stylesheet

const DashboardView = () => {
  const [averageDealAmount, setAverageDealAmount] = useState(null);
  const [closedWonPercentage, setClosedWonPercentage] = useState(null);
  const [closedLostPercentage, setClosedLostPercentage] = useState(null);
  const [averageTimeToClose, setAverageTimeToClose] = useState(null);
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
      <div className="dashboard-card">
        <h2>Average Deal Amount</h2>
        <p>${averageDealAmount}</p>
      </div>
      <div className="dashboard-card pie-chart-card">
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
      <div className="dashboard-card">
        <h2>Average Time to Close</h2>
        <p>{averageTimeToClose} days</p>
      </div>
    </div>
  );
};

export default DashboardView;
