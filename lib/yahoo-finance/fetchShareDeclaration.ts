"use server";

export async function fetchShareDeclarations(cid: string, date: string) {
  try {
    console.log(date);
    const response = await fetch(
      `https://rsebl.org.bt/agm/api/client-holdings/${cid}/${date}`,
      { cache: "no-store" } // Ensures fresh data, prevents caching
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching holdings:", error);
    return [];
  }
}
