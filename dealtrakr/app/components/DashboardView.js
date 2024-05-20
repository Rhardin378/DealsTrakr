import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardView = () => {
  const [averageDealAmount, setAverageDealAmount] = useState(null);

  useEffect(() => {
    const fetchAverageDealAmount = async () => {
      try {
        const response = await axios.get("http://localhost:8000/deals");
        setAverageDealAmount(response.data.averageDealAmount);
      } catch (error) {
        console.log("Error fetching the average deal amount:", error);
      }
    };

    fetchAverageDealAmount();
  }, []);

  return (
    <>
      <p>Dashboard tab content</p>
      <p>Average Deal Amount: ${averageDealAmount}</p>
    </>
  );
};

export default DashboardView;
