// DashboardView.js
import React, { useEffect, useState } from 'react';
import { fetchDashboardDealData } from '../components/FetchDashboardDealData';
import { PieChart } from 'react-minimal-pie-chart';

const DashboardView = () => {
  const [averageDealAmount, setAverageDealAmount] = useState(null);
  const [closedWonPercentage, setClosedWonPercentage] = useState(null);
  const [closedLostPercentage, setClosedLostPercentage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDealData = async () => {
      try {
        const data = await fetchDashboardDealData();
        setAverageDealAmount(data.averageDealAmount);
        setClosedWonPercentage(data.closedWonPercentage);
        setClosedLostPercentage(data.closedLostPercentage);
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
    <div>
      <p>Average Deal Amount: ${averageDealAmount}</p>

      {/* https://www.npmjs.com/package/react-minimal-pie-chart */}
      <PieChart className='pie-chart'
        data={[
          { title: 'Closed Won', value: closedWonPercentageAsNumber, color: '#E38627' },
          { title: 'Closed Lost', value: closedLostPercentageAsNumber, color: '#C13C37' }
        ]}
        radius={40}
        viewBoxSize={[300, 300]}
        label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}%`}
        labelPosition={60}
        paddingAngle={0}
        labelStyle={{
          fontSize: '3.75px',
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          strokeWidth: '1'
        }}
      />

  </div>
  );
};

export default DashboardView;
