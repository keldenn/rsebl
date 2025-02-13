export async function fetchShareDeclarations(cid: string, date: string) {
    try {
      const response = await fetch(
        `https://rsebl.org.bt/agm/api/client-holdings/${cid}/${date}`
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
  