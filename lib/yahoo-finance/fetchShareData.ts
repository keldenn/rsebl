"use server"
import { unstable_noStore as noStore } from "next/cache";

export const fetchShareData = async (order_no) => {
    noStore();
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    
    try {
        const response = await fetch(`${BASE_URL}/getReportforOSS/${order_no}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {

        throw new Error("Could not fetch Share Statement.");
    }
};

