import { cn } from "@/lib/utils"
import { CalendarDays } from "lucide-react"
import { TrendingUp } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

// Fetch sector-specific performance data
async function fetchSectorPerformance() {
  const url = `https://rsebl.org.bt/agm/api/fetch-sectorPerformance` // Replace with your Laravel endpoint
  const options = {
    method: "GET",
    next: {
      revalidate: 3600,
    },
  }
  const res = await fetch(url, options)

  if (!res.ok) {
    throw new Error("Failed to fetch sector performance")
  }
  return res.json()
}

// Fetch "All Sectors" data from the provided API
async function fetchAllSectors() {
  const url = `https://rsebl.org.bt/agm/api/fetch-BSI`
  const options = {
    method: "GET",
    next: {
      revalidate: 3600,
    },
  }
  const res = await fetch(url, options)

  if (!res.ok) {
    throw new Error("Failed to fetch All Sectors data")
  }
  return res.json()
}

interface Sector {
  sector_type: string
  percentageChange: string
  current_index: string
  ptChange: string
  created_date: string // Added created_date field
}

interface AllSectorsData {
  index: string
  ptChange: string
  created_date: string
}

// Function to format date
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}

export default async function SectorPerformance() {
  // Fetch data from both APIs
  const sectorData = (await fetchSectorPerformance()) as Sector[]
  const allSectorsData = (await fetchAllSectors()) as AllSectorsData[]

  if (!sectorData || !allSectorsData) {
    return null
  }

  // Extract index, ptChange, and created_date from "All Sectors" data
  const { index, ptChange, created_date } = allSectorsData[0]
  const indexValue = parseFloat(index)
  const ptChangeValue = parseFloat(ptChange)

  // Calculate the percentage change for "All Sectors"
  const allSectorsPercentageChange =
    ((ptChangeValue / (indexValue - ptChangeValue)) * 100).toFixed(2)

// Ensure we handle cases where created_date is missing
const allSectorsCreatedDate = created_date || sectorData[0]?.created_date || new Date().toISOString();

// Add "All Sectors" to the sector data
const allSectors = {
  sector_type: "ALL SECTORS",
  percentageChange: allSectorsPercentageChange + "%",
  current_index: index, 
  ptChange: ptChange,
  created_date: allSectorsCreatedDate, // Ensure it has a valid date
}

  sectorData.unshift(allSectors)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {sectorData.map((sector: Sector) => (
        <HoverCard key={sector.sector_type}>
          <HoverCardTrigger asChild>
            <div className="flex w-full flex-row items-center justify-between text-sm cursor-pointer">
              <span className="font-medium">{sector.sector_type}</span>
              <span
                className={cn(
                  "w-[4rem] min-w-fit rounded-md px-2 py-0.5 text-right transition-colors",
                  parseFloat(sector.percentageChange) > 0
                    ? "bg-gradient-to-l from-green-300 text-green-800 dark:from-green-950 dark:text-green-400"
                    : parseFloat(sector.percentageChange) < 0
                    ? "bg-gradient-to-l from-red-300 text-red-800 dark:from-red-950 dark:text-red-500"
                    : "bg-gradient-to-l from-gray-300 text-gray-800 dark:from-gray-950 dark:text-gray-500"
                )}
              >
                {parseFloat(sector.percentageChange).toFixed(2) + "%"}
              </span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">
                  {sector.sector_type}
                </h4>
                
                <p className="text-sm">
                  <strong>Current Index:</strong>{" "}
                  <span
                    className={cn(
                      parseFloat(sector.current_index) > 0
                        ? "text-green-600"
                        : parseFloat(sector.current_index) < 0
                        ? "text-red-600"
                        : "text-gray-500"
                    )}
                  >
                    {sector.current_index}
                  </span>
                </p>
                <p className="text-sm">
                  <strong>Point Change:</strong>{" "}
                  <span
                    className={cn(
                      parseFloat(sector.ptChange) > 0
                        ? "text-green-600"
                        : parseFloat(sector.ptChange) < 0
                        ? "text-red-600"
                        : "text-gray-500"
                    )}
                  >
                    {sector.ptChange}
                  </span>
                </p>
                <p className="text-sm">
                  <strong>Percentage Change:</strong>{" "}
                  <span
                    className={cn(
                      parseFloat(sector.percentageChange) > 0
                        ? "text-green-600"
                        : parseFloat(sector.percentageChange) < 0
                        ? "text-red-600"
                        : "text-gray-500"
                    )}
                  >
                    {parseFloat(sector.percentageChange).toFixed(2)}%
                  </span>
                </p>
                <div className="flex items-center pt-2">
                  {sector.sector_type !== "ALL" && sector.sector_type !== "ALL SECTORS" && (
                    <>
                      <TrendingUp className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        {sector.sector_type === "MANUFACTURING"
                          ? "Started with Market Cap 125824147.92"
                          : sector.sector_type === "INSURANCE"
                          ? "Started with Market Cap 203376493.10"
                          : sector.sector_type === "BANKING"
                          ? "Started with Market Cap 229932442.94"
                          : sector.sector_type === "TOURISM"
                          ? "Started with Market Cap 14334058.20"
                          : sector.sector_type === "PUBLISHING"
                          ? "Started with Market Cap 1700000.00"
                          : sector.sector_type === "DISTRIBUTION"
                          ? "Started with Market Cap 12757630.88"
                          : sector.sector_type === "TRADING"
                          ? "Started with Market Cap 883319.58"
                          : ""}
                      </span>
                    </>
                  )}
                </div>

                {sector.sector_type !== "ALL" && sector.sector_type !== "ALL SECTORS" && (
                <div className="flex items-center pt-2">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                  <span className="text-xs text-muted-foreground">
                    Started on Feb 7, 2025
                  </span>
                </div>
              )}
                {/* <div className="flex items-center pt-2">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                  <span className="text-xs text-muted-foreground">
                    Updated on {formatDate(sector.created_date)}
                  </span>
                </div> */}
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  )
}
