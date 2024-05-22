// DashboardView.js
import React, { useEffect, useState } from 'react';
import { fetchDashboardDealData } from '../components/FetchDashboardDealData';

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

  return (
    <>
      <p>Dashboard tab content</p>
      <p>Average Deal Amount: ${averageDealAmount}</p>
      <p>Closed Won Percentage: {closedWonPercentage}%</p>
      <p>Closed Lost Percentage: {closedLostPercentage}%</p>
    </>
  );
};

export default DashboardView;
