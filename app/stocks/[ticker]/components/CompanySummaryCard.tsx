import { Card, CardContent } from "../../../../components/ui/card"
import ReadMoreText from "../../../../components/ui/read-more-text"
import Link from "next/link"

export default async function CompanySummaryCard({
  ticker,
}: {
  ticker: string
}) {
  // Fetch data from the custom API
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/fetch-single-script/${ticker}`
  )
  const data = await response.json()

  if (!data || data.length === 0) {
    return null
  }

  // Extract relevant fields
  const companyData = data[0]
  const {
    name,
    sector,
    address,
    paid_up_shares,
    website_link,
    date_of_est,
    logo_path,
  } = companyData

  return (
    <Card className="group relative min-h-max overflow-hidden">
      <div className="absolute z-0 h-full w-full bg-gradient-to-t from-neutral-50 via-neutral-200 to-neutral-50 bg-size-200 bg-pos-0 blur-2xl transition-all duration-500 group-hover:bg-pos-100 dark:from-black dark:via-blue-950 dark:to-black" />

      <CardContent className="z-50 flex h-full w-full flex-col items-start justify-center gap-6 py-10 text-sm lg:flex-row">
        <div className="z-50 max-w-2xl text-pretty font-medium">
          <ReadMoreText
            text={`Learn more about ${name}. Established in ${date_of_est}.`}
            truncateLength={500}
          />
        </div>

        {sector && address && paid_up_shares && website_link && (
          <div className="z-50 min-w-fit font-medium text-muted-foreground">
            <div>
              Sector: <span className="text-foreground">{sector}</span>
            </div>
            <div>
              Address: <span className="text-foreground">{address}</span>
            </div>
            <div>
              Paid-up Shares:{" "}
              <span className="text-foreground">
                {parseInt(paid_up_shares).toLocaleString("en-US")}
              </span>
            </div>
            <div>
              Website:{" "}
              <span className="text-foreground">
                {website_link && (
                  <Link
                    href={website_link}
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    {website_link}
                  </Link>
                )}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
