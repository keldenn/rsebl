import Link from "next/link"
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns"

function formatDate(dateString: string) {
  // Try parsing common date formats
  const formats = [
    "yyyy-MM-dd HH:mma", // Example: 2023-04-29 10:00AM
    "h:mm a dd'th' MMMM yyyy", // Example: 10:00 AM 28th February 2018
    "yyyy-MM-dd", // Example: 2022-04-30
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", // ISO string
  ]

  for (const fmt of formats) {
    const parsedDate = parse(dateString, fmt, new Date())
    if (isValid(parsedDate)) {
      return format(parsedDate, "dd MMM yyyy, h:mm a") // Desired output format
    }
  }

  // Fallback if no format matches
  return "Invalid Date"
}

// Function to calculate relative time
function timeAgo(publishTime: string) {
  const publishDate = new Date(publishTime)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - publishDate.getTime()) / 60000)

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)} hours ago`
  } else {
    return `${Math.floor(diffInMinutes / 1440)} days ago`
  }
}
// Function to fetch AGM data
async function fetchAgmData(ticker: string) {
  const response = await fetch(
    `https://rsebl.org.bt/agm/api/fetch-agm-by-symbol/${ticker}`
  )
  if (!response.ok) {
    throw new Error("Failed to fetch AGM data")
  }
  return response.json()
}

export default async function Agm({ ticker }: { ticker: string }) {
  const agmData = await fetchAgmData(ticker)

  return (
    <div className="w-4/5">
      {!agmData || agmData.length === 0 ? (
        <div className="py-4 text-center text-sm font-medium text-muted-foreground">
          No AGM information available
        </div>
      ) : (
        <>
        <div
            className="group flex w-fit flex-row items-center gap-2 pb-4 text-sm font-medium text-custom-1"
          >
            Events
          </div>
          <div className="flex flex-col gap-5">
            {agmData.map((agm: any, index: number) => (
              <div key={index} className="flex flex-col gap-1">
                <span className="font-semibold ">
                  {agm.agm_name}
                </span>
                <span className="text-sm text-muted-foreground"> - {agm.date}</span>
                <span className="text-sm text-muted-foreground"> - {agm.venue}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
