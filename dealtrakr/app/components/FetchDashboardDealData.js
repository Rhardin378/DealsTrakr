import axios from "axios";

export const fetchDashboardDealData = async () => {
  try {
    const response = await axios.get("https://dealstrakr.onrender.com/deals");
    return response.data;
  } catch (error) {
    console.error("Error fetching the deal data:", error);
    throw error;
  }
};
