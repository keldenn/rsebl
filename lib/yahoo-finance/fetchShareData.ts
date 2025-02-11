import { unstable_noStore as noStore } from "next/cache";

export const fetchShareData = async (order_no) => {
    noStore();
    console.log("Fetching data for order_no:", order_no); // ✅ Log order number
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    
    try {
        const response = await fetch(`${BASE_URL}/getReportforOSS/${order_no}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data); // ✅ Log API response
        return data;
    } catch (error) {
        console.error("Failed to fetch Share Statement:", error);
        throw new Error("Could not fetch Share Statement.");
    }
};

