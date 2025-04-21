// ==========================================================================
// API key for data.gov.in "Variety-wise Daily Market Prices Data of Commodity" 
// ==========================================================================
const API_KEY = "579b464db66ec23bdd000001fac27c69942749186fd4b37b3801eae4";

// This is the correct resource ID for "Variety-wise Daily Market Prices Data of Commodity"
const BASE_URL = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

export interface CropPrice {
  crop: string;
  variety: string;
  pricePerQuintal: string;
  market: string;
  state: string;
  district?: string;
  lastUpdated?: string;
}

export const fetchCropPrices = async (): Promise<CropPrice[]> => {
  try {
    // Try to fetch from the API, but with a timeout to prevent long loading
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
    
    const response = await fetch(
      `${BASE_URL}?api-key=${API_KEY}&format=json&limit=15`,
      { signal: controller.signal }
    );
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.error("API response not OK:", response.status, response.statusText);
      return getMockPrices();
    }
    
    const data = await response.json();
    
    // Check if we got valid records
    if (!data.records || !Array.isArray(data.records) || data.records.length === 0) {
      console.warn("No records found in API response");
      return getMockPrices();
    }
    
    // Transform the API response to match our interface
    return data.records.map((record: any) => ({
      crop: record.commodity || "Unknown",
      variety: record.variety || "Standard",
      pricePerQuintal: `₹${record.modal_price || "N/A"}`,
      market: record.market || "Unknown",
      state: record.state || "Unknown",
      district: record.district || "Unknown",
      lastUpdated: record.arrival_date || "Today"
    }));
  } catch (error) {
    console.error("Error fetching market prices:", error);
    // Always return mock data if API fails for any reason
    return getMockPrices();
  }
};

// Mock data to simulate real-time prices - used as fallback
const getMockPrices = (): CropPrice[] => [
  { crop: "Rice", variety: "Basmati", pricePerQuintal: "₹3,800", market: "Azadpur", state: "Delhi", district: "North Delhi", lastUpdated: "Today" },
  { crop: "Wheat", variety: "Durum", pricePerQuintal: "₹2,150", market: "Indore", state: "Madhya Pradesh", district: "Indore", lastUpdated: "Today" },
  { crop: "Maize", variety: "Yellow", pricePerQuintal: "₹1,950", market: "Nizamabad", state: "Telangana", district: "Nizamabad", lastUpdated: "Today" },
  { crop: "Soybean", variety: "Regular", pricePerQuintal: "₹4,200", market: "Kota", state: "Rajasthan", district: "Kota", lastUpdated: "Today" },
  { crop: "Cotton", variety: "Long Staple", pricePerQuintal: "₹6,500", market: "Rajkot", state: "Gujarat", district: "Rajkot", lastUpdated: "Today" },
  { crop: "Potato", variety: "Kufri Jyoti", pricePerQuintal: "₹1,800", market: "Agra", state: "Uttar Pradesh", district: "Agra", lastUpdated: "Today" },
  { crop: "Onion", variety: "Red", pricePerQuintal: "₹2,200", market: "Lasalgaon", state: "Maharashtra", district: "Nashik", lastUpdated: "Today" },
  { crop: "Tomato", variety: "Hybrid", pricePerQuintal: "₹2,500", market: "Kolar", state: "Karnataka", district: "Kolar", lastUpdated: "Today" },
]; 