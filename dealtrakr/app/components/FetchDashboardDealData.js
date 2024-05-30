import axios from 'axios';

export const fetchDashboardDealData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/deals');
    return response.data;
  } catch (error) {
    console.error('Error fetching the deal data:', error);
    throw error;
  }
};
